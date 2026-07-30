import { useEffect, useState } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import UmbrellaRoundedIcon from "@mui/icons-material/UmbrellaRounded";
import ThunderstormRoundedIcon from "@mui/icons-material/ThunderstormRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import socket from "../services/socket";

function getWeatherPresentation(weather, weatherCode) {
  const condition = String(weather || "").toLowerCase();
  const code = Number(weatherCode);

  if ((code >= 200 && code < 300) || condition.includes("thunder")) {
    return { label: "Stormy", icon: <ThunderstormRoundedIcon fontSize="large" />, color: "#7c3aed" };
  }
  if ((code >= 300 && code < 600) || /rain|drizzle|shower/.test(condition)) {
    return { label: "Rainy", icon: <UmbrellaRoundedIcon fontSize="large" />, color: "#0284c7" };
  }
  if ((code >= 801 && code <= 804) || /cloud|mist|fog|haze|smoke|dust|sand|ash/.test(condition)) {
    return { label: "Cloudy", icon: <CloudRoundedIcon fontSize="large" />, color: "#64748b" };
  }
  return { label: "Sunny", icon: <WbSunnyRoundedIcon fontSize="large" />, color: "#f59e0b" };
}

function Weather({ dashboard }) {
  const [weather, setWeather] = useState({ temperature: 0, weather: "Loading...", humidity: null, wind: null, airQuality: "Unavailable" });

  useEffect(() => {
    const handleWeather = (data) => setWeather(data);
    socket.on("weatherUpdate", handleWeather);
    return () => socket.off("weatherUpdate", handleWeather);
  }, []);

  const display = weather.weather === "Loading..." && dashboard
    ? { ...weather, temperature: dashboard.temperature, weather: dashboard.weather, humidity: dashboard.humidity, wind: dashboard.wind, airQuality: dashboard.airQuality }
    : weather;
  const presentation = getWeatherPresentation(display.weather, display.weatherCode);

  return <Card elevation={8} sx={{ borderRadius: 4 }}><CardContent>
    <Typography variant="h5" fontWeight="bold">Live Weather & Air Quality</Typography>
    <Typography variant="h3" mt={1}>{display.temperature}°C</Typography>
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: presentation.color }}>
        {presentation.icon}
        <Typography fontWeight="bold">{presentation.label}</Typography>
      </Stack>
      <Typography>Humidity: {display.humidity ?? "—"}%</Typography>
      <Typography>Wind: {display.wind ?? "—"} m/s</Typography>
      <Typography>Air quality: {display.airQuality || "Unavailable"}</Typography>
    </Stack>
  </CardContent></Card>;
}

export default Weather;
