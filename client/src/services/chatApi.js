import api from "./api";

export const sendChat = async (message) => (await api.post("/chat", { message })).data;
