import api from "./api";

export const getAdminAnalytics = async () => (await api.get("/analytics")).data;
