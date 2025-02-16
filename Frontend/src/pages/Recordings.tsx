import axios from "axios";
import {useEffect,useState} from "react";
import {useUser} from "@clerk/clerk-react";
import { VideoCard } from "@/components/VideoCard.tsx";
import {RecordingsResponseType} from "@/types/RecordingsResponseType.ts";
import {useCallback} from "react";
import {Clapperboard} from "lucide-react";
import {toast} from "sonner";

export default function Recordings(){
    const userData = useUser();
    const [videos,setVideos] = useState<RecordingsResponseType[]>([]);


    const getVideos = useCallback(async () => {
        if (userData) {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/recordings`, {
                userId: userData.user?.id
            });
            setVideos(response.data.recordings);
        }
    }, [userData.user?.id]);


    async function handleDeleteVideo(videoId : string){
       const prevVideos = [...videos];
       setVideos(videos.filter(video => video.id !== videoId));

       try {
           await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/user/delete`, {
               data: {
                   userId: userData.user?.id,
                   recordingKey: videoId,
               }
           });
           toast.success("Record deleted successfully.");
       }catch(err){
           toast.error(`Failed to delete recording ${err}`);
           setVideos(prevVideos);
           return;
       }
    }


    useEffect(() =>{
      getVideos()
    },[userData.user?.id])

    return(
        <div className="p-7 flex flex-col gap-5">
            <div className="flex flex-row items-center gap-2 ml-52">
                <Clapperboard size="35"/>
                <h1 className="font-bold text-4xl">Videos</h1>
            </div>
            <div className="flex flex-wrap gap-5">
                    <VideoCard videoData={videos} onDeleteVideo={handleDeleteVideo} />
            </div>

        </div>
    )
}