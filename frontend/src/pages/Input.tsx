import { Input } from "../components/ui/input.tsx";
import { Label } from "../components/ui/label.tsx";
import { useState, useCallback } from "react"
import axios from "axios"
import { toast } from "sonner"
import SelectDemo from "@/components/Select.tsx";

export default function InputDemo() {
    const [link, setLink] = useState("");

    const sendLink = useCallback(async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/getMeetId`, {
                link: link,
            })
            toast.success(response.data.message, {
                description: "Meeting Link Sent"
            });
            setLink("")
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to send meeting link");
        }
    }, [link])

    return (
        <div className="flex items-center justify-center px-4 mt-40">
            <div className="space-y-6 w-full max-w-4xl">
                <Label
                    htmlFor="input-21"
                    className="text-white text-4xl md:text-5xl lg:text-7xl font-bold text-center block"
                >
                    Add Meeting Link...
                </Label>
                <SelectDemo/>
                <div className="flex rounded-lg shadow-sm shadow-black/5 w-full">

                    <Input
                        onChange={(e) => {
                            e.preventDefault();
                            setLink(e.target.value)
                        }}
                        value={link}
                        id="input-21"
                        className="-me-px  flex-1 py-3 rounded-e-none bg-black text-white placeholder:text-white focus:border-white border-neutral-800 shadow-none focus-visible:z-10"
                        placeholder="Meet Link.."
                        type="email"
                    />
                    <button
                        onClick={sendLink}
                        className=" inline-flex items-center rounded-e-lg border border-neutral-800 placeholder:text-white hover:bg-neutral-900 hover:text-white text-white bg-black border-input px-3 text-sm font-medium text-foreground outline-offset-2 transition-colors hover:bg-accent hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}