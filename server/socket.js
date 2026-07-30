const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { getAllowedOrigins } = require("./config/env");

const DASHBOARD_ROOM = "dashboard";
let io;

function initSocket(server) {
  const allowedOrigins = getAllowedOrigins();
  io = new Server(server, {
    cors: {
      origin: allowedOrigins.length ? allowedOrigins : process.env.NODE_ENV !== "production",
      methods: ["GET", "POST"],
    },
  });

  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new Error("Token missing");
      socket.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.emit("connected", { id: socket.id, status: "success" });

    socket.on("joinDashboard", () => {
      socket.join(DASHBOARD_ROOM);
    });
  });
}

function broadcast(event, payload) {
  if (io) {
    io.to(DASHBOARD_ROOM).emit(event, payload);
  }
}

function getIO() {
  return io;
}

module.exports = { broadcast, getIO, initSocket };
