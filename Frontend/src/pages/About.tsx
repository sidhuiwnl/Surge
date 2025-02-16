export default function About() {
    return (
        <div className="p-7 flex flex-col gap-3 justify-center items-center mt-20 ">
            <h1>OverView</h1>
            <p className="max-w-4xl mb-20 leading-10">
                Surge is an AI-powered meeting bot designed to record meetings and generate accurate summaries using Google Generative AI. It integrates seamlessly with platforms like Google Meet and Zoom, providing real-time recording, transcription, and summarization. The application leverages WebSockets for efficient data streaming and uses PostgreSQL with Prisma ORM for structured data storage.
            </p>
            <h1>Feature</h1>
            <p className="max-w-4xl leading-10">

                Meeting Recording: Captures and stores meeting audio/video.
                AI-Powered Summaries: Uses Google Gemini AI to generate concise and informative meeting summaries.
                Platform Integration: Works with Google Meet, Zoom, and other virtual meeting platforms.
                Real-Time Streaming: WebSocket implementation for low-latency recording and streaming.
                Database Storage: Utilizes PostgreSQL and Prisma ORM for data management.
            </p>
        </div>
    )
}