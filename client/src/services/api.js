import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");

// During local development the Express server runs on port 5000. In production
// it must be a separately deployed API URL (for example a Render/Railway URL).
const serverOrigin = configuredApiUrl || (import.meta.env.DEV
  ? "http://localhost:5000"
  : "");

export const API_URL = serverOrigin
  ? `${serverOrigin}${serverOrigin.endsWith("/api") ? "" : "/api"}`
  : "";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  if (!API_URL) {
    return Promise.reject(new Error(
      "The API is not configured. Set VITE_API_URL in your Vercel project environment variables and redeploy."
    ));
  }

  return config;
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const sendMessage = async (message) => {
  const response = await api.post("/chat", { message });
  return response.data.data;
};

export const getDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

export default api;
