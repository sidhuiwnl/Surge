import  { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing()

export  const uploadRouter = {
    videoUploader : f({
        video  : {
            maxFileCount : 1,
            maxFileSize : "2GB"
        }
    }).onUploadComplete((data) =>{
        console.log("uploadComplete")
    })
}satisfies FileRouter

export type OurFileRouter = typeof uploadRouter;