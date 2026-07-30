import api from "./api";

export const getActivities = async () => (await api.get("/activity")).data;
