import { Input } from "../components/ui/input.tsx";
import { useState, useCallback } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select.tsx"
import RecordingStatus from "@/components/RecordingStatus.tsx";

export default function InputDemo() {
    const [link, setLink] = useState("");

    const sendLink = useCallback(async () => {
        setLink(" ")
        try {

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_SPAWNER_URL}/getMeetId`, {
                link: link,
            })
            toast.success(response.data.message, {
                description: "Meeting Link Sent"
            });

        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to send meeting link");
        }
    }, [link])

    return (
        <div className="text-white">
            <main className="container mx-auto px-4 py-12 space-y-7">
                <div className="mt-5 mb-20">
                   <RecordingStatus/>
                </div>

                <div className="max-w-2xl mx-auto space-y-8">
                    <h1 className="text-4xl font-bold text-center mb-12">
                        Add Meeting Link
                    </h1>

                    <div className="space-y-6">
                        <Select defaultValue="google">
                            <SelectTrigger className="w-full bg-white/5 border-white/10">
                                <SelectValue placeholder="Select platform"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="google">Google Meet</SelectItem>
                                <SelectItem value="zoom" disabled>Zoom</SelectItem>
                                <SelectItem value="teams" disabled>Microsoft Teams</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex gap-3">
                            <Input
                                placeholder="Enter meeting link..."
                                className="flex-1 bg-white/5 border-white/10 text-white"
                                onChange={(e) => {
                                    e.preventDefault()

                                    setLink(e.target.value)}}
                            />
                            <Button
                                onClick={sendLink}
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
                <footer className="container mx-auto px-4 mt-10 text-center text-white/60">
                    <p>Paste your meeting link above to start recording</p>
                </footer>
            </main>
        </div>

    );
}