import ffmpeg from "fluent-ffmpeg";
import * as path from "node:path";
const fs = require('fs').promises;
import {GoogleGenerativeAI} from "@google/generative-ai";
import {GoogleAIFileManager,FileState} from "@google/generative-ai/server";


const fileManager = new GoogleAIFileManager("AIzaSyCrUbvn_ApodELl9h2en9NIVggXMRRbHGU");
const genAI = new GoogleGenerativeAI("AIzaSyCrUbvn_ApodELl9h2en9NIVggXMRRbHGU");

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const prompt = "Tell me about this audio clip.";



export async function transcribeAudios( videoBuffer : Buffer){
    try{
        const tempVideoPath  = path.join(__dirname,"temp_video.mp4");
        const tempAudioPath  = path.join(__dirname,"temp_audio.wav");

         await fs.writeFile(tempVideoPath,videoBuffer);
         await extractAudios(tempVideoPath, tempAudioPath);
         const description = await transcribeAudio(tempAudioPath);
         return description;


    }catch(err){

    }
}

function extractAudios(videoPath : string,outputPath : string){
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .toFormat('wav')
            .outputOptions([
                '-ac', '1',
                '-ar', '16000'
            ])
            .on('end', resolve)
            .on('error', reject)
            .save(outputPath);

    })
}

async function transcribeAudio(audioPath : string){
    try{
        const uploadResult = await fileManager.uploadFile(
            audioPath,{
                mimeType: "audio/mp3",
                displayName : "Meet audio"
            }
        )
        let file = await fileManager.getFile(uploadResult.file.name);
        while (file.state === FileState.PROCESSING) {
            process.stdout.write(".");
            // Sleep for 10 seconds
            await new Promise((resolve) => setTimeout(resolve, 10_000));
            // Fetch the file from the API again
            file = await fileManager.getFile(uploadResult.file.name);
        }
        if (file.state === FileState.FAILED) {
            throw new Error("Audio processing failed.");
        }
        console.log(
            `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
        );

        const result = await model.generateContent([
            prompt,
            {
                fileData : {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType,
                }
            }
        ])
        return result.response.text();
    }catch(err){
        console.error('Error transcribing audio:', err);
        throw err;
    }
}