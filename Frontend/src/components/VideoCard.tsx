import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { RecordingsResponseType } from "@/types/RecordingsResponseType";
import Player from "@/components/Player";
import { DropdownMenuCheckboxes } from "@/components/DropDownPanel";

import { formatDistanceToNow } from "date-fns"
import {NavLink} from "react-router";
import {LoaderCircle} from "lucide-react";

export function VideoCard({
                              videoData,
                              onDeleteVideo
                          }: {
    videoData: RecordingsResponseType[] | null;
    onDeleteVideo: (videoId: string) => Promise<void>;
}) {
    if (videoData === null) {
        return (
            <div className="container mx-auto flex items-center justify-center py-32 h-full w-full overflow-hidden">
                <LoaderCircle className="animate-spin w-8 h-8 text-neutral-500" />
            </div>
        );
    }

    if (videoData.length === 0) {
        return (
            <div className="container mx-auto flex items-center justify-center py-32 h-full w-full overflow-hidden">
               <p>There is no Videos Recording to Show</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {videoData?.map((video) => (

                <Card
                    key={video.id}
                    className="group relative overflow-hidden rounded-xl bg-neutral-900 border-none transition-all duration-300 hover:shadow-lg hover:shadow-neutral-800/50 hover:-translate-y-1"
                >
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenuCheckboxes
                            deleteVideo={() => onDeleteVideo(video?.id)}
                        />
                    </div>

                    <CardHeader className="p-2 w-full aspect-video">
                        <div className="relative w-full h-full">
                            <Player url={video.url} />
                        </div>
                    </CardHeader>
                    <NavLink

                        to={`/recordings/${video.id}`}
                        state={{
                            video
                        }}
                    >
                        <CardContent className="p-4 space-y-4">
                            <p className="text-neutral-100 text-sm font-medium line-clamp-2 hover:line-clamp-none transition-all">
                                {video.description}
                            </p>

                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0">
                                    <img
                                        src={video.user.image}
                                        width={40}
                                        height={40}
                                        className="rounded-full ring-2 ring-neutral-700"
                                        alt={`${video.user.firstName} ${video.user.lastName}`}
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-neutral-100 text-sm font-medium truncate">
                                        {video.user.firstName} {video.user.lastName}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {formatDistanceToNow(new Date(video.createdAt), {addSuffix: true})}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </NavLink>
                </Card>

            ))}
        </div>
    );
}

export default VideoCard;