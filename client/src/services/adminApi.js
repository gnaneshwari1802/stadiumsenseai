import api from "./api";

export const updateDashboard = async (dashboard) => (await api.put("/dashboard", dashboard)).data.data;
