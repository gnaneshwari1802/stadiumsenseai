import { useEffect, useState } from "react";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import socket, { connectSocket } from "../services/socket";
import { getDashboard } from "../services/dashboardApi";
import ActivityFeed from "./ActivityFeed";
import AIChat from "./AIChat";
import AlertBanner from "./AlertBanner";
import AnalyticsCard from "./AnalyticsCard";
import CameraFeed from "./CameraFeed";
import ChatHistory from "./ChatHistory";
import CrowdChart from "./CrowdChart";
import DashboardCards from "./DashboardCards";
import Notifications from "./Notifications";
import ParkingMap from "./ParkingMap";
import PredictionCard from "./PredictionCard";
import StadiumMap from "./StadiumMap";
import Weather from "./Weather";

const initialDashboard = {
  crowdDensity: 0,
  crowdLevel: "LOW",
  activeGate: "Main Entrance",
  parkingOccupied: 0,
  parkingCapacity: 200,
  parkingAvailable: 200,
  temperature: 0,
  weather: "Loading...",
  securityAlerts: 0,
  aiPrediction: "Collecting live stadium data.",
  dataSource: "waiting",
  lastTelemetryAt: null,
};

function Dashboard() {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [socketConnected, setSocketConnected] = useState(socket.connected);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getDashboard();
        if (response.success) setDashboard(response.data);
      } catch (error) {
        console.error("Unable to load dashboard:", error);
      }
    };
    const handleDashboardUpdate = (data) => setDashboard(data);
    const handleConnect = () => {
      setSocketConnected(true);
      socket.emit("joinDashboard");
    };
    const handleDisconnect = () => setSocketConnected(false);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    loadDashboard();
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    connectSocket();
    if (socket.connected) handleConnect();
    socket.on("dashboardUpdate", handleDashboardUpdate);

    return () => {
      clearInterval(timer);
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("dashboardUpdate", handleDashboardUpdate);
    };
  }, []);

  return (
    <Box sx={{ p: 3, minHeight: "100vh", bgcolor: "#f5f7fb" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        mb={0}
        spacing={1}
      >
        <Typography variant="h4" fontWeight="bold">StadiumSense AI Dashboard</Typography>
        <Box textAlign={{ xs: "left", sm: "right" }} sx={{ minWidth: { sm: 300 } }}>
          <Stack direction="row" spacing={1} justifyContent={{ xs: "flex-start", sm: "flex-end" }}>
            <Chip
              size="small"
              color={dashboard.dataSource === "telemetry" && socketConnected ? "success" : "default"}
              label={dashboard.dataSource === "telemetry" ? (socketConnected ? "Live telemetry" : "Reconnecting") : dashboard.dataSource === "demo" ? "Demo data" : "Waiting for telemetry"}
            />
          </Stack>
          <Stack direction="row" spacing={1.5} justifyContent={{ xs: "flex-start", sm: "flex-end" }} alignItems="center" flexWrap="wrap" useFlexGap>
            <Typography fontWeight="bold">{currentTime.toLocaleDateString()}</Typography>
            <Typography color="text.secondary">•</Typography>
            <Typography fontWeight="bold">Location: {dashboard.activeGate}</Typography>
          </Stack>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>{currentTime.toLocaleTimeString()}</Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            Weather location: Hyderabad, Telangana, India — 500001
          </Typography>
          <Box aria-hidden="true" sx={{ height: 16 }} />
          {dashboard.lastTelemetryAt && <Typography variant="caption" color="text.secondary" display="block">Telemetry received: {new Date(dashboard.lastTelemetryAt).toLocaleTimeString()}</Typography>}
        </Box>
      </Stack>
      <Box aria-hidden="true" sx={{ height: 16 }} />
      <AlertBanner />
      <DashboardCards dashboard={dashboard} />
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 8 }}><Weather dashboard={dashboard} /><CrowdChart dashboard={dashboard} /><ParkingMap dashboard={dashboard} /></Grid>
        <Grid size={{ xs: 12, md: 4 }}><Notifications /><PredictionCard dashboard={dashboard} /><AnalyticsCard dashboard={dashboard} /></Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, md: 6 }}><CameraFeed dashboard={dashboard} /><StadiumMap dashboard={dashboard} /></Grid>
        <Grid size={{ xs: 12, md: 6 }}><AIChat /><ChatHistory /></Grid>
      </Grid>
      <Grid container spacing={3} sx={{ mt: 1 }}><Grid size={12}><ActivityFeed /></Grid></Grid>
    </Box>
  );
}

export default Dashboard;
