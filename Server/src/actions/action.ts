import { UploadFileResult } from "uploadthing/types";
import {prisma} from "../lib/prisma";

export default  async function addRecordings(videoData : UploadFileResult,userId : string | null,title : string,description : string){
    if(!videoData.data ){
        return
    }

    if(userId === null){
        return
    }
    try{
        console.log("the userid that is passed",userId);
        const response = await prisma.recordings.create({
            data : {
                id : videoData?.data.key,
                url : videoData.data.url,
                userId : userId,
                createdAt : new Date(),
                description : description,
                title : title,
            }
        })
        console.log(response)
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
