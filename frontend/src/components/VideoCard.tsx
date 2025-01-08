import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card.tsx";
import {RecordingsResponseType} from "@/types/RecordingsResponseType.ts";
import VideoCardSkeleton from "@/components/Skeleton.tsx";
import Player from "@/components/Player.tsx";

import {NonVideoCard} from "@/components/MarqueeComp.tsx";

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


