import api from "./api";

export const getWeather = async (city = "Hyderabad") => (await api.get("/weather", { params: { city } })).data;
