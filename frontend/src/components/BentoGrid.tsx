import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import {  Share2Icon,VideoIcon } from "lucide-react";
import {BentoGrid,BentoCard} from "@/components/ui/bento-grid.tsx";
import {AnimatedBeamMultipleOutputDemo} from "@/components/AnimatedBeam.tsx";
import {MarqueeDemo} from "@/components/MarqueeComp.tsx";

const features = [
    {
        Icon: FileTextIcon,
        name: "Transcribe",
        description: "Transcribe your meetings in.",
        href: "#",
        cta: "Learn more(Comming Soon)",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div></div>
        )
    },
    {
        Icon: VideoIcon,
        name: "Recordings",
        description: "Get Recordings of Your Meetings in.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <MarqueeDemo
            />
        )
    },
    {
        Icon: Share2Icon,
        name: "Integrations",
        description: "Supports 3+ video conferencing platforms.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none bg-black transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        )
    },
    {
        Icon: CalendarIcon,
        name: "Calendar",
        description: "Use the calendar to filter your files by date.",
        className: "col-span-3 lg:col-span-1",
        href: "#",
        cta: "Learn more",
        background: (
            <div></div>
        )

    },
];

export function BentoDemo() {
    return (
        <BentoGrid>
            {features.map((feature, idx) => (
                <BentoCard key={idx} {...feature} />
            ))}
        </BentoGrid>
    );
}
