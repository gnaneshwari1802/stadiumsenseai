import api from "./api";

export const getHistory = async () => (await api.get("/history")).data;
