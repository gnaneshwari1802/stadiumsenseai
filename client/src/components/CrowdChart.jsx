import { useEffect, useState } from "react";
import { Card, CardContent, Chip, LinearProgress, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import socket from "../services/socket";

function CrowdChart({ dashboard }) {
  const [crowd, setCrowd] = useState({ density: 0, level: "LOW", gate: "Main Entrance" });

  useEffect(() => {
    const handleCrowd = (data) => setCrowd(data);
    socket.on("crowdUpdate", handleCrowd);
    return () => socket.off("crowdUpdate", handleCrowd);
  }, []);

  const display = crowd.density === 0 && dashboard ? { density: dashboard.crowdDensity, level: dashboard.crowdLevel, gate: dashboard.activeGate } : crowd;
  const color = display.level === "HIGH" ? "error" : display.level === "MEDIUM" ? "warning" : "success";

  return <Card elevation={8} sx={{ mt: 3, borderRadius: 4 }}><CardContent>
    <Typography variant="h5" fontWeight="bold"><GroupsIcon sx={{ mr: 1, verticalAlign: "bottom" }} />Crowd Analytics</Typography>
    <Typography variant="h2" fontWeight="bold" mt={2}>{display.density}%</Typography>
    <LinearProgress variant="determinate" value={display.density} sx={{ height: 15, borderRadius: 10, mt: 3 }} />
    <Chip label={display.level} color={color} sx={{ mt: 3, mr: 2 }} /><Chip label={display.gate} color="primary" sx={{ mt: 3 }} />
  </CardContent></Card>;
}

export default CrowdChart;
