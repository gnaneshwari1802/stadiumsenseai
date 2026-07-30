import axios from "axios";

const serverOrigin = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:5000`;
export const API_URL = `${serverOrigin}/api`;

const api = axios.create({ baseURL: API_URL });

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
