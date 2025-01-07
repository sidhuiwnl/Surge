import {useEffect,useState} from "react";


export default function RecordingStatus() {
    const[recordingStatus, setRecordingStatus] = useState("");
    const[socket, setSocket] = useState<WebSocket | null>(null);
    const[connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "disconnected" | "error">("connecting");

    console.log(recordingStatus)
    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8080?type=status`)

        ws.onopen = () =>{
            console.log("connected")
            setConnectionStatus("connected")
        }
        ws.onmessage = (event) =>{
           try {
                const data = JSON.parse(event.data)

                setRecordingStatus(data)
               setConnectionStatus("connected")
           }catch (error){
               console.log(error)
           }
        }
        ws.onclose = () => {
            console.log('WebSocket Disconnected');
            setConnectionStatus("disconnected");
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
            setConnectionStatus("error");
        };


        setSocket(ws)
        return () => {
            if (ws) {
                ws.close();
            }
        };
    },[])
    return (
        <div>
            <h1 className="text-xl font-semibold text-white">Recording Status</h1>
            <div className="flex items-center gap-2">
                {connectionStatus === "connecting" && (
                    <div className="h-4 w-4 animate-spin text-blue-500"/>
                )}
                <span className={`text-sm capitalize ${
                    connectionStatus === "connected" ? "text-green-500" :
                        connectionStatus === "disconnected" ? "text-yellow-500" :
                            connectionStatus === "error" ? "text-red-500" : "text-blue-500"
                }`}>
            {connectionStatus}
          </span>
            </div>
        </div>

    )
}