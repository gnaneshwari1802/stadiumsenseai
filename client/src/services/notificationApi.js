import api from "./api";

export const getNotifications = async () => (await api.get("/notifications")).data;
export const markRead = async (id) => (await api.patch(`/notifications/${id}/read`)).data;
