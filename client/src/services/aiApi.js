import api from "./api";

export const askAI = async (question) => (await api.post("/ai", { question })).data;
