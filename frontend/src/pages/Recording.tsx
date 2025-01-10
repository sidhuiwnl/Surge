import { useLocation } from "react-router";
import Player from "@/components/Player.tsx";
import { formatDistanceToNow } from "date-fns"


export  default function RecordingPage(){
    const location = useLocation();
    const videoDetail = location.state?.video;


    return(
        <div className="flex flex-col p-4 space-y-6">
            <div>
                <h1 className="text-2xl font-bold antialiased">This is the title for the recording</h1>
                <p className="text-sm mt-3">{videoDetail.user.firstName} {videoDetail.user.lastName}  <span className="text-xs text-gray-400">{formatDistanceToNow(new Date(videoDetail.createdAt), {addSuffix: true})}</span></p>

            </div>
            <div className="w-[1000px] h-[800px]">
                <Player url={videoDetail.url}/>
            </div>

        </div>
    )
}