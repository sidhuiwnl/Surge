# Surge

## Overview
Surge is an AI-powered meeting bot designed to record meetings and generate accurate summaries using Google Generative AI. It integrates seamlessly with platforms like Google Meet and Zoom, providing real-time recording, transcription, and summarization. The application leverages WebSockets for efficient data streaming and uses PostgreSQL with Prisma ORM for structured data storage.

## Features
- **Meeting Recording**: Captures and stores meeting audio/video.
- **AI-Powered Summaries**: Uses Google Gemini AI to generate concise and informative meeting summaries.
- **Platform Integration**: Works with Google Meet, Zoom, and other virtual meeting platforms.
- **Real-Time Streaming**: WebSocket implementation for low-latency recording and streaming.
- **Database Storage**: Utilizes PostgreSQL and Prisma ORM for data management.

## Tech Stack
- **Frontend**: React.js, TypeScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Prisma ORM
- **AI Integration**: Google Gemini AI
- **Real-Time Communication**: WebSockets

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- PostgreSQL (latest version)
- Prisma ORM
- Google Generative AI API Key

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/sidhuiwnl/Surge.git
   cd Surge
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables:
   Create a `.env` file in the root directory and add the following:
   ```sh
   DATABASE_URL="your_postgresql_database_url"
   GOOGLE_AI_API_KEY="your_google_generative_ai_api_key"
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage
- Start a meeting recording via the UI.
- AI automatically generates meeting summaries.
- View and manage stored meetings in the dashboard.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
MIT License

## Author
[Sidharth Babu](https://github.com/sidhuiwnl)

