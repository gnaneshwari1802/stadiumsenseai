const axios = require("axios");
const { updateDashboard } = require("./dashboardService");

const airQualityLabels = ["Unknown", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

async function getCurrentWeather(city = process.env.WEATHER_CITY || "Hyderabad") {
  if (!process.env.WEATHER_API_KEY) {
    throw new Error("WEATHER_API_KEY is not configured");
  }

  const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { q: city, appid: process.env.WEATHER_API_KEY, units: "metric" },
    timeout: 10000,
  });
  const data = response.data;
  const weather = {
    temperature: data.main.temp,
    weather: data.weather?.[0]?.main || "Unknown",
    humidity: data.main.humidity,
    wind: data.wind?.speed || 0,
    updatedAt: new Date(),
  };

  try {
    const airResponse = await axios.get("https://api.openweathermap.org/data/2.5/air_pollution", {
      params: { lat: data.coord.lat, lon: data.coord.lon, appid: process.env.WEATHER_API_KEY },
      timeout: 10000,
    });
    const airQualityIndex = airResponse.data.list?.[0]?.main?.aqi;
    if (airQualityIndex) {
      weather.airQualityIndex = airQualityIndex;
      weather.airQuality = airQualityLabels[airQualityIndex] || "Unknown";
    }
  } catch (airError) {
    console.warn("Air quality update failed:", airError.message);
  }

  await updateDashboard(weather, { recordAnalytics: false });
  return weather;
}

async function updateWeather(city) {
  return getCurrentWeather(city);
}

module.exports = { getCurrentWeather, updateWeather };
