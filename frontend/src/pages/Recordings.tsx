import axios from "axios";
import {useEffect,useState} from "react";
import {useUser} from "@clerk/clerk-react";
import VideoCard from "@/components/VideoCard.tsx";
import {RecordingsResponseType} from "@/types/RecordingsResponseType.ts";
import {useCallback} from "react";

export default function Recordings(){
    let userData = useUser();
    const [videos,setVideos] = useState<RecordingsResponseType[]>([]);

    const getVideos = useCallback(async () =>{
        if(userData){
            const response =  await axios.post(`${import.meta.env.VITE_WEBSOCKET_BASE_URL}/recordings`,{
                userId :  userData.user?.id
            })
            setVideos(response.data.recordings)
            console.log(response.data.recordings)
        }
    },[userData.user?.id])



    useEffect(() =>{
      getVideos()
    },[userData.user?.id])

    return(
        <div className="p-7 flex flex-col gap-5">
            <div className="flex flex-row items-center gap-2">

                <h1 className="font-bold text-4xl">Videos</h1>
            </div>
            <div className="flex flex-wrap gap-5">
                    <VideoCard videoData={videos}/>
            </div>
        </div>
    )
}