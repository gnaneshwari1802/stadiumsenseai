# StadiumSense AI

StadiumSense AI is a real-time stadium operations dashboard. It combines crowd and parking telemetry, weather and air-quality data, notifications, analytics, AI assistance, and live updates over Socket.IO.

## Project structure

```text
StadiumSenseAI/
├── client/    React + Vite dashboard
└── server/    Express + MongoDB API and Socket.IO server
```

## Requirements

- Node.js 18 or newer
- MongoDB (local or Atlas)
- An OpenWeather API key for live weather
- A Gemini API key if the AI assistant is enabled

## Local setup

1. Install dependencies:

   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

2. Configure the server:

   ```bash
   cd server
   copy .env.example .env       # Windows
   # cp .env.example .env       # macOS/Linux
   ```

   Set at least `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`, and `WEATHER_API_KEY`. For local development, `CLIENT_URL=http://localhost:5173` and `ENABLE_DEMO_TELEMETRY=true` are convenient defaults. Keep `.env` files out of version control.

3. Configure the client:

   ```bash
   cd client
   copy .env.example .env       # Windows
   # cp .env.example .env       # macOS/Linux
   ```

   Set `VITE_API_URL=http://localhost:5000`. The client automatically appends `/api` when it is not already present.

4. Start both applications in separate terminals:

   ```bash
   # terminal 1
   cd server
   npm run dev

   # terminal 2
   cd client
   npm run dev
   ```

   Open the Vite URL shown in the terminal (normally `http://localhost:5173`). The API health check is available at `http://localhost:5000/health`.

## Authentication

Register or log in through the dashboard. For a local-only test administrator, the repository includes `server/createAdmin.js`:

```bash
cd server
node createAdmin.js
```

That script creates the `admin` account with its hard-coded development password (`admin123`). Change the script before using it anywhere beyond local development, and never use that password in production.

## Live telemetry

Trusted CCTV, IoT, or edge services can post readings to `POST /api/telemetry`. Include the server-side `TELEMETRY_INGEST_KEY` in the `x-telemetry-key` header. See [server/TELEMETRY.md](server/TELEMETRY.md) for the payload and security requirements.

Set `ENABLE_DEMO_TELEMETRY=false` in production so simulated readings are not generated. Accepted telemetry is persisted in MongoDB and broadcast to authenticated dashboard clients through Socket.IO.

## Useful commands

```bash
cd client
npm run build       # production frontend build
npm run lint        # frontend linting
npm run preview     # preview the production build

cd ../server
npm start           # production-style API start
npm run dev         # development server with nodemon
```

## Deployment

Deploy the `server` and `client` separately. Set the client’s `VITE_API_URL` to the public API URL and set the API server’s `CLIENT_URL` to the public client origin (comma-separated origins are supported). Configure all secrets through the hosting provider’s environment-variable manager. In production, use a strong `JWT_SECRET` of at least 32 characters and provide `TELEMETRY_INGEST_KEY` when demo telemetry is disabled.

## Main API routes

The API is served below `/api`: `/auth`, `/dashboard`, `/weather`, `/analytics`, `/history`, `/activity`, `/notifications`, `/ai`, and `/telemetry`. Dashboard, weather, analytics, and notification operations require a bearer token unless noted by the route implementation.

## License

This project does not currently declare a license. Add one before distributing it publicly.
