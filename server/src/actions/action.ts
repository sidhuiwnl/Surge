import { UploadFileResult } from "uploadthing/types";
import {prisma} from "../lib/prisma";

export default  async function addRecordings(videoData : UploadFileResult,userId : string | null){
    if(!videoData.data ){
        return
    }

    if(userId === null){
        return
    }
    try{
        await prisma.recordings.create({
            data : {
                id : videoData?.data.key,
                url : videoData.data.url,
                userId : userId,
                createdAt : new Date(),
            }
        })
        return{
            success : true,
            message : "Recordings added",
        }
    }catch (error){
        return{
            success : false,
            message : "Error adding recordings",
        }
    }

}
