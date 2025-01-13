import { useLocation } from "react-router";
import Player from "@/components/Player.tsx";
import { formatDistanceToNow } from "date-fns"


export  default function RecordingPage(){
    const location = useLocation();
    const videoDetail = location.state?.video;


    return(
        <div className="flex flex-col p-4 space-y-3">
            <div>
                <h1 className="text-2xl font-bold antialiased">{videoDetail.title}</h1>
                <p className="text-sm mt-3">{videoDetail.user.firstName} {videoDetail.user.lastName}  <span className="text-xs text-gray-400">{formatDistanceToNow(new Date(videoDetail.createdAt), {addSuffix: true})}</span></p>
            </div>
            <div className="flex flex-col w-[1000px] space-y-3">
                <Player url={videoDetail.url}/>
                <h1>Description</h1>
                <span className="text-sm mt-5 text-neutral-600">{videoDetail.description}</span>
            </div>
        </div>
    )
}