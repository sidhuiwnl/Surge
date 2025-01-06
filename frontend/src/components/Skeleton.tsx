import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card.tsx";

export default function VideoCardSkeleton() {
    return (
        <div className="flex flex-wrap gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <Card
                    key={index}
                    className="w-[350px] bg-neutral-900 border-none animate-pulse"
                >
                    <CardHeader className="w-full">
                        <div className="w-full h-[200px] bg-neutral-700 rounded-lg" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="w-3/4 h-4 bg-neutral-700 rounded-md" />
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-8 h-8 bg-neutral-700 rounded-full" />
                            <div className="flex flex-col items-end w-full gap-1">
                                <div className="w-1/2 h-4 bg-neutral-700 rounded-md" />
                                <div className="w-1/3 h-3 bg-neutral-600 rounded-md" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
