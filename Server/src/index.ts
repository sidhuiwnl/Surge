import ws from "ws";
import express from "express";
import cors from "cors";
import * as http from "node:http";
import {createRouteHandler} from "uploadthing/express";
import { uploadRouter } from "./lib/uploadthing";
import { UTApi } from "uploadthing/server";
import dotenv from "dotenv";
import ffmpeg from 'fluent-ffmpeg';
import * as stream from "node:stream";
import userRoute from "./routes/user"
import addRecordings from "./actions/action";
import {transcribeAudios} from "./lib/ffmpegutils";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(
    "/api/uploadthing",
    createRouteHandler({
        router: uploadRouter,
        config : {
            token : process.env.UPLOADTHING_TOKEN
        }
    }),
);

app.use("/api/user",userRoute);




const server = http.createServer(app);
const wss = new ws.Server({server });
const utapi = new UTApi();

const clients = new Set<ws>();
const mediaStreams = new Set<ws>();
export const userId = new Set<string>();

let videoChunks : Buffer[] = [];


let recordingState = {
    isRecording : false,
    startTime : null as Date | null,
    bytesReceived :0,

}

function broadCastStatus(status : string){
    clients.forEach(client =>{
        if(client.readyState === ws.OPEN){
            client.send(JSON.stringify({
                status,
                duration : getRecordingDuration(),
                bytesReceived : recordingState.bytesReceived
            }))
        }
    })
}


function getRecordingDuration() : string{
    if(!recordingState.startTime) return "0:00";
    const diff = new Date().getTime() - recordingState.startTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}



async function convertBufferToMP4(inputBuffer: Buffer): Promise<Buffer> {

    if(!inputBuffer || inputBuffer.length === 0){
        throw new Error("Input buffer is empty");
    }
    return new Promise((resolve, reject) => {
        const bufferStream = new stream.PassThrough();
        const chunks: Buffer[] = [];

        const outputStream = new stream.PassThrough();


        outputStream.on('data', (chunk) => {
            chunks.push(chunk);
        });

        outputStream.on("finish",() =>{
            setTimeout(() => {
                resolve(Buffer.concat(chunks))
            },4000)
        })

        outputStream.on("error",(err) =>{
            reject(err);
        })

        ffmpeg(bufferStream)
            .toFormat('mp4')
            .outputOptions([
                '-movflags frag_keyframe+empty_moov',
                '-c:v libx264',
                '-preset ultrafast',
                '-c:a aac'
            ])
            .on("end",async () =>{
                console.log("end")

            })
            .on('error', (err) => {
                console.error('FFmpeg error:', err);
                    reject(err);

            })
            .pipe(outputStream,{
                end : true
            });

        bufferStream.end(inputBuffer);
    });
}



wss.on("connection", (socket,request) => {
    console.log(request.url)
    const url = new URL(request.url!,`http://${request.headers.host}`);

    console.log(`the url from ${url}`)

    console.log("Client connected");

    const connectionType = url.searchParams.get("type");
    const webscoketReceivedUserId = url.searchParams.get("userId");

    if(webscoketReceivedUserId ){
        userId.clear()
        userId.add(webscoketReceivedUserId);
    }



    console.log(`New ${connectionType || 'unknown'} connection`);



    if(connectionType === "media" && userId){
        handleConnectionMedia(socket);
    }else {
        handleClientConnectionStatus(socket);
    }


});


function handleConnectionMedia(socket : ws  ){
    mediaStreams.add(socket);

    if(!recordingState.isRecording){
        recordingState.isRecording = true;
        recordingState.startTime = new Date();
        recordingState.bytesReceived = 0;
        broadCastStatus("Recording started");
    }
    socket.on("message",(data) =>{
        if (Buffer.isBuffer(data)) {
            videoChunks.push(data);
            recordingState.bytesReceived += data.length;
            broadCastStatus("Recording in progress");
        }

    })
    socket.on("close", async () => {
        mediaStreams.delete(socket);
        await handleRecordingEnd();
        userId.clear()


    });
    socket.on("error", (error) => {
        console.error("WebSocket error:", error);
        broadCastStatus("Recording error occurred");
    });
}



function handleClientConnectionStatus(socket : ws){
    clients.add(socket);

    socket.send(JSON.stringify({
        status: recordingState.isRecording ? "Recording in progress" : "Ready",
        duration: getRecordingDuration(),
        bytesReceived: recordingState.bytesReceived
    }));

    socket.on("close", () => {
        clients.delete(socket);
    });

    socket.on("error", (error) => {
        console.error("Client WebSocket error:", error);
    });
}





async function handleRecordingEnd() {
    if (mediaStreams.size === 0 && videoChunks.length > 0 && userId) {
        broadCastStatus("Processing recording");
        recordingState.isRecording = false;


        try {
            const videoBuffer = Buffer.concat(videoChunks);
            const mp4Buffer = await convertBufferToMP4(videoBuffer);
            const videoBlob = new Blob([mp4Buffer], { type: "video/mp4" });
            const videoFile = new File([videoBlob], "output.mp4", { type: "video/mp4" });

            const metadata = await transcribeAudios(videoBuffer)

            const response = await utapi.uploadFiles([videoFile]);

            if (response[0] && userId.values().next().value && metadata){
                const id = userId.values().next().value;
                console.log(id)
                if(id){
                    await addRecordings(response[0], id,metadata.title,metadata.description);
                }

                broadCastStatus("Recording completed");
            }
        } catch (error) {
            console.error("Error processing video:", error);
            broadCastStatus("Error processing recording");
        }

        videoChunks = [];
        recordingState.bytesReceived = 0;
        recordingState.startTime = null;
    }
}











server.listen(8080,() =>{
    console.log(`WebSocket server running on port 8080`)
})