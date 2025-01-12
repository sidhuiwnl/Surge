import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import {Card} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {DatabaseIcon} from "lucide-react";

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/james",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);


const ReviewCard = ({
                        img,
                        name,
                        username,
                        body,
                    }: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] dark:bg-none hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-none dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function MarqueeDemo() {
    return (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg  text-white bg-background bg-neutral-900  md:shadow-xl">
            <Marquee pauseOnHover className="[--duration:20s] ">
                {firstRow.map((review) => (
                    <ReviewCard key={review.username} {...review} />
                ))}
            </Marquee>


        </div>
    );
}

export function NonVideoCard(){
    return(
        <div className="w-screen flex flex-col items-center justify-center">
            <Card className="w-[1000px] h-[350px] bg-neutral-900 border-none p-2">
                <div className="flex flex-col gap-3 w-full border-white h-full bg-zinc-950 rounded-xl">
                    <div className="p-4">
                        <Badge className="p-2">
                            <DatabaseIcon size="15" className="mr-2"/>
                            Video Collection
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
