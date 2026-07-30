require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");
const { getAllowedOrigins, validateEnvironment } = require("./config/env");
const { initSocket } = require("./socket");
const { startRealtimeScheduler } = require("./scheduler/realtimeScheduler");

const app = express();
const server = http.createServer(app);

const allowedOrigins = getAllowedOrigins();

app.set("trust proxy", 1);
app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : process.env.NODE_ENV !== "production" }));
app.use(express.json({ limit: "100kb" }));
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/weather", require("./routes/weatherRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/telemetry", require("./routes/telemetryRoutes"));

app.get("/", (req, res) => res.status(200).json({
  success: true,
  app: "StadiumSense AI",
  version: "1.0.0",
  status: "Running",
  time: new Date(),
}));

app.get("/health", (req, res) => res.status(200).json({ success: true, status: "healthy" }));

app.use((req, res) => res.status(404).json({ success: false, message: "API Route Not Found" }));
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = Number(process.env.PORT) || 5000;

async function start() {
  validateEnvironment();
  await connectDB();
  initSocket(server);
  startRealtimeScheduler();
  server.listen(PORT, () => console.log(`StadiumSense AI backend listening on port ${PORT}`));
}

start().catch((error) => {
  console.error("Unable to start server:", error.message);
  process.exit(1);
});
