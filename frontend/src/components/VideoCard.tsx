import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card.tsx";
import {RecordingsResponseType} from "@/types/RecordingsResponseType.ts";
import VideoCardSkeleton from "@/components/Skeleton.tsx";
import Player from "@/components/Player.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {DatabaseIcon} from "lucide-react";
import {MarqueeDemo} from "@/components/MarqueeComp.tsx";

export default function VideoCard({
    videoData
                                  } : {
    videoData : RecordingsResponseType[] | null
}){

    if (videoData === null) {
        return <VideoCardSkeleton />;
    }

    if (videoData.length === 0){
        return(
            <NonVideoCard/>
        );
    }

    return(
        <div className="flex flex-wrap gap-3 ">
            {videoData && videoData.length > 0 ? videoData.map((video) => (
                <Card key={video.id} className="w-[350px] h-[350px] bg-neutral-900 border-none">
                    <CardHeader className="h-[200px]">
                        <Player url={video.url}/>
                    </CardHeader>
                    <CardContent className="space-y-2">

                        <p className="text-neutral-400">You can now track all your user signups directly from the admin dashboard.</p>
                        <div className="flex flex-row items-center gap-2 ">
                            <img
                                src={video.user.image}
                                width={30}
                                height={30}
                                className="rounded-full"
                                alt="user"
                            />
                            <div className="flex flex-col items-end w-full">
                                <p className="text-white text-sm">
                                    {video.user.firstName} {video.user.lastName}

                                </p>
                                <p className="text-neutral-400 text-sm">
                                    {new Intl.DateTimeFormat("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true
                                    }).format(new Date(video.createdAt))}
                                </p>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            )) : (
                <VideoCardSkeleton />
            )}
        </div>

    )
}


function NonVideoCard(){
    return(
        <div className="w-screen flex flex-col items-center justify-center">
            <Card className="w-[1000px] h-[350px] bg-neutral-900 border-none p-2">
               <div className="flex flex-col gap-3 w-full border-white h-full bg-zinc-950 rounded-xl">
                   <div className="p-4">
                       <Badge className="p-2">
                           <DatabaseIcon size="15" className="mr-2"/>
                           No Video Collection
                       </Badge>
                       <div className=" flex flex-col w-full space-y-4 max-w-2xl text-white mt-3">
                           <h1 className="font-bold text-2xl">Record The Meet</h1>
                           <p className="text-sm text-neutral-400">Harness the power of bot to record yout meet and view quality recordings and transcribe
                               the recordings</p>

                       </div>
                       <div className="w-full mt-2 ">
                           <MarqueeDemo/>
                       </div>
                   </div>

               </div>
            </Card>
        </div>

    )
}