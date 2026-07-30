import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5000`;

const socket = io(socketUrl, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export function connectSocket() {
  socket.auth = { token: localStorage.getItem("token") };
  if (!socket.connected) socket.connect();
}

export default socket;
