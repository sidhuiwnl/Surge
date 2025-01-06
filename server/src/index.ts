import ws from "ws";
import express from "express";
import {Request,Response} from "express";
import cors from "cors";
import * as http from "node:http";
import {createRouteHandler} from "uploadthing/express";
import { uploadRouter } from "./uploadthing";
import { UTApi } from "uploadthing/server";
import dotenv from "dotenv";
import {prisma} from "./lib/prisma";
import { UploadFileResult } from "uploadthing/types";
import ffmpeg from 'fluent-ffmpeg';
import * as stream from "node:stream";

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



let userId : string | " " = "user_2r4pbmZ7akp4enz6hAGYjYgaAZA";



const server = http.createServer(app);

const wss = new ws.Server({server });

const utapi = new UTApi();

let videoChunks : Buffer[] = [];

async function convertBufferToMP4(inputBuffer: Buffer): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const bufferStream = new stream.PassThrough();
        const chunks: Buffer[] = [];

        const outputStream = new stream.PassThrough();


        outputStream.on('data', (chunk) => {
            chunks.push(chunk);
        });

        outputStream.on('end', () => {
            resolve(Buffer.concat(chunks));
        });

        ffmpeg(bufferStream)
            .toFormat('mp4')
            .outputOptions([
                '-movflags frag_keyframe+empty_moov',
                '-c:v libx264',
                '-preset ultrafast',
                '-c:a aac'
            ])
            .on("end",() =>{
                console.log("end")
            })
            .on('error', (err) => {
                console.error('FFmpeg error:', err);
                reject(err);
            })
            .pipe(outputStream);

        bufferStream.end(inputBuffer);
    });
}

wss.on("connection", (socket) => {


    console.log("Client connected");

    socket.on("message",(data) =>{
        if(Buffer.isBuffer(data)){
            videoChunks.push(data)
        }
    })


    socket.on("close",  async() => {
        console.log("Client disconnected");

        if(videoChunks.length > 0){
            const videoBuffer = Buffer.concat(videoChunks);

            try {
                console.log("Converting to MP4...");
                const mp4Buffer = await convertBufferToMP4(videoBuffer);

                const videoBlob = new Blob([mp4Buffer], {
                    type : "video/mp4"
                })

                const videoFile = new File([videoBlob], "output.mp4", {
                    type: "video/mp4",
                });
                const response = await utapi.uploadFiles([videoFile])
                console.log("Uploaded file details:", response);
                if(response){
                    await addRecordings(response[0])
                }

            }catch (error){
                console.error("Error uploading video:", error);
            }

        }
        videoChunks = [];
    });

    socket.on("error", (error) => {
        console.error("WebSocket error:", error);

    });
});


async function addRecordings(videoData : UploadFileResult){
    if(!videoData.data){
        return
    }
    await prisma.recordings.create({
        data : {
            id : videoData?.data.key,
            url : videoData.data.url,
            userId : userId,
            createdAt : new Date(),
        }
    })
    console.log("Recordings added")
}


app.post("/recordings",async (req  : Request,res : Response) => {
    const userId = req.body;
    console.log(userId)
    if(!userId.userId){
        res.status(400).json({
            message : "Unauthorised"
        })
        return
    }
    try {
        const recordings = await prisma.recordings.findMany({
            where : {
                userId : userId.userId
            },
            include : {
                user : true,
            }
        })
        res.status(200).json({
            message : "Recordings fetched",
            recordings
        })
    }catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
})



app.post("/addUser",async (req : Request,res : Response ) =>{
    const userData = req.body;
    userId = userData.id;
    if(!userData.id){
        res.status(400).json({
            message : "Unauthorised"
        })
        return
    }


    try{
        const existingUser = await prisma.user.findUnique({
            where : {
                id : userData.id
            }
        })
        if(existingUser){

            res.status(400).json({
                message : "User already exists"


            })
            return
        }


        const response = await prisma.user.create({
            data : {
                id : userData.id,
                firstName : userData.firstName,
                lastName : userData.lastName,
                email : userData.email,
                image : userData.image
            }
        })

        res.status(200).json({
            message : "User created"
        })
    }catch (error){
       res.status(500).json({
           message : "Internal server error"
       })
    }


})




server.listen(8080,() =>{
    console.log("WebSocket server running on port 8080");
})