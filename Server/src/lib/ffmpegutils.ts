import dotenv from "dotenv";
import ffmpeg from "fluent-ffmpeg";

import * as path from "node:path";
const fs = require('fs').promises;
import {GoogleGenerativeAI} from "@google/generative-ai";
import {GoogleAIFileManager,FileState} from "@google/generative-ai/server";
dotenv.config();

const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY as string);
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY as string);

const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const prompt1 = "Tell me about this audio clip.";

const prompt2  = "Generate a single title which explains entire of the audio clip.";


export async function transcribeAudios( videoBuffer : Buffer) {
    try{
        const tempVideoPath  = path.join(__dirname,"temp_video.mp4");
        const tempAudioPath  = path.join(__dirname,"temp_audio.wav");

         await fs.writeFile(tempVideoPath,videoBuffer);
         await extractAudios(tempVideoPath, tempAudioPath);
         const { title, description } = await transcribeAudio(tempAudioPath);
         return {
             title,
             description,
         };
    }catch(err){
        console.log("Cannot able to transcribe audio files.",err);
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

            await new Promise((resolve) => setTimeout(resolve, 10_000));

            file = await fileManager.getFile(uploadResult.file.name);
        }
        if (file.state === FileState.FAILED) {
            throw new Error("Audio processing failed.");
        }
        console.log(
            `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`,
        );

        const resultFOrDescription = await model.generateContent([
            prompt1,
            {
                fileData : {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType,
                }
            },
        ])
        const resultFotTitle = await model.generateContent([
            prompt2,{
                fileData : {
                    fileUri: uploadResult.file.uri,
                    mimeType: uploadResult.file.mimeType,
                }
            }
        ])
        const description = resultFOrDescription.response.text();
        const title = resultFotTitle.response.text();

        return {
            title: title,
            description: description,
        };
    }catch(err){
        console.error('Error transcribing audio:', err);
        throw err;
    }
}