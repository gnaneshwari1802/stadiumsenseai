import { useEffect, useState } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import socket from "../services/socket";

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

  return <Card elevation={8} sx={{ borderRadius: 4 }}><CardContent>
    <Typography variant="h5" fontWeight="bold">Live Weather & Air Quality</Typography>
    <Typography variant="h3" mt={1}>{display.temperature}°C</Typography>
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      <Typography>{display.weather}</Typography>
      <Typography>Humidity: {display.humidity ?? "—"}%</Typography>
      <Typography>Wind: {display.wind ?? "—"} m/s</Typography>
      <Typography>Air quality: {display.airQuality || "Unavailable"}</Typography>
    </Stack>
  </CardContent></Card>;
}

export default Weather;
