import {useEffect,useState,useRef} from "react";

import {useUser} from "@clerk/clerk-react";

interface RecordingStatus {
    status: string;
    duration?: string;
    bytesReceived?: number;
    fileUrl?: string;
    error?: string;
}


type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";


const RECONNECT_DELAY = 5000;


export default function RecordingStatus() {
    const { user,isLoaded,isSignedIn } = useUser();
    const[recordingStatus, setRecordingStatus] = useState<RecordingStatus | null>(null);
    const[connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting");

    const reconnectRef = useRef<NodeJS.Timeout>()
    const socketRef = useRef<WebSocket | null>(null);
    const connectionAttemptedRef = useRef(false);


    function connectWebSocket(){
        if(!isSignedIn || !user?.id){
            return;
        }

        try{
            const ws = new WebSocket(`${import.meta.env.VITE_SERVER_WEBSOCKET_URL}?type=status&userId=${user?.id}`);
            socketRef.current = ws;

            ws.onopen = () =>{
                setConnectionStatus("connected")

            }
            ws.onmessage = (event) =>{
                try {
                    const data = JSON.parse(event.data) as RecordingStatus;
                    setRecordingStatus(data);
                } catch (error) {
                    console.error("Failed to parse WebSocket message:", error);
                }
            }

            ws.onclose = () =>{
                setConnectionStatus("disconnected");
                socketRef.current = null;

                reconnectRef.current = setTimeout(() => {
                    connectWebSocket();
                }, RECONNECT_DELAY);

            }
            ws.onerror = (error) => {
                console.error("WebSocket Error:", error);
                setConnectionStatus("error");
            };
        }catch (error){
            console.error("Failed to connect to WebSocket:", error);
            setConnectionStatus("error");
        }
    }

    console.log(recordingStatus)
    useEffect(() => {

        if(!isLoaded || !connectionAttemptedRef ) return;

        connectionAttemptedRef.current = true;

        connectWebSocket()

        return () => {
            if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                socketRef.current.close();
            }
            if(reconnectRef.current){
                clearTimeout(reconnectRef.current)
            }
        };
    },[isLoaded,isSignedIn,user?.id])
    return (
        <div className="rounded-lg flex justify-center border-2 border-neutral-700 p-3 bg-white">
            <h1 className="text-sm font-medium text-neutral-800">Recording Status : </h1>
            <div className="flex  items-center gap-2 ml-1">
                {connectionStatus === "connecting" && (
                    <div className="h-4 w-4 animate-spin text-blue-500"/>
                )}
                <span className={`text-sm capitalize ${
                    connectionStatus === "connected" ? "text-green-500" :
                        connectionStatus === "disconnected" ? "text-yellow-500" :
                            connectionStatus === "error" ? "text-red-500" : "text-blue-500"
                }`}>
            {connectionStatus} ({ recordingStatus?.status ?  recordingStatus?.status : "Not Ready"})

          </span>
            </div>
        </div>

    )
}