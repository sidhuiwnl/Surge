import {Request, Response} from "express";
import {prisma} from "../lib/prisma";
import {Router} from "express";
import { UTApi } from "uploadthing/server";

const router = Router();

const utapi = new UTApi();



router.delete("/delete",async (req : Request,res : Response) =>{
    const { userId, recordingKey } = req.body;

    if(!userId || !recordingKey){
        res.status(400).json({
            message : "Unauthorised"
        })
        return
    }

    if(userId !== userId){
        res.status(400).json({
            message : "Unauthorised"
        })
    }

    try{
        const userExist = await prisma.user.findUnique({
            where : {
                id : userId
            }
        })

        if(!userExist){
            res.status(400).json({
                message : "Unauthorised"
            })
            return
        }

        await utapi.deleteFiles([recordingKey]);
        const updatedRecordings = await prisma.recordings.delete({
                where : {
                    id : recordingKey
                }
            }
        )
        res.status(200).json({
            message : "Recording deleted",
            recordings : updatedRecordings
        })
    }catch (error){
        res.status(500).json({
            message : "Internal server error"
        })
    }




})


router.post("/recordings",async (req  : Request,res : Response) => {
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



router.post("/addUser",async (req : Request,res : Response ) =>{
    const userData = req.body;
    const userId = userData.id;
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

export default router;