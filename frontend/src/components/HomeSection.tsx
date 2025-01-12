import {NavLink} from "react-router";
import {RainbowButton} from "@/components/ui/rainbow-button.tsx";
import DotPattern from "@/components/ui/dot-pattern.tsx";
import { cn } from "@/lib/utils.ts"
import {FlipWords} from "@/components/ui/flip-words.tsx";

export default function HomeSection() {
    const words = ["Google Meet","Zoom(ComingSoon)","Teams(ComingSoon)"]
    return (
        <div className="p-6 flex ml-32 flex-col items-start mt-24 max-w-4xl antialiased">
            <h1 className="text-8xl tracking-tight font-extrabold mb-3">The Meeting Bot </h1>
            <h1 className="text-8xl tracking-tight font-extrabold mb-3">You Need.</h1>
            <div className="text-neutral-300 text-3xl mb-3 space-y-1 ">Surge Bot simplifies meeting management by recording entire sessions and generating accurate transcriptions for
                <FlipWords className="text-white text-2xl" words={words} duration={3000}/>
            </div>
            <div className="mt-5">
                <NavLink to={"/add"} className="mt-4">
                    <RainbowButton>
                        Access
                    </RainbowButton>
                </NavLink>

            </div>
            <DotPattern
                className={cn(
                    "-z-10 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
                )}/>
        </div>
    )
}

