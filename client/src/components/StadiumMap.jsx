import { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip, Grid, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import GroupsIcon from "@mui/icons-material/Groups";
import socket from "../services/socket";

const gates = ["Main Entrance", "East Entrance", "West Entrance", "North Entrance", "South Entrance", "VIP Entrance"];

function StadiumMap({ dashboard }) {
  const [crowd, setCrowd] = useState({ gate: "Main Entrance", density: 0 });
  useEffect(() => {
    const handleCrowd = (data) => setCrowd(data);
    socket.on("crowdUpdate", handleCrowd);
    return () => socket.off("crowdUpdate", handleCrowd);
  }, []);
  const display = crowd.density === 0 && dashboard ? { gate: dashboard.activeGate, density: dashboard.crowdDensity } : crowd;

  return <Card elevation={8} sx={{ mt: 3, borderRadius: 4 }}><CardContent><Typography variant="h5" fontWeight="bold">Stadium Map</Typography><Grid container spacing={2} mt={2}>
    {gates.map((gate) => { const active = gate === display.gate; return <Grid size={4} key={gate}><Box sx={{ p: 2, borderRadius: 3, textAlign: "center", bgcolor: active ? "#ef5350" : "#37474f", color: "white" }}><GroupsIcon /><Typography>{gate}</Typography><Chip sx={{ mt: 1 }} icon={<CircleIcon />} color={active ? "error" : "success"} label={active ? `${display.density}%` : "Normal"} /></Box></Grid>; })}
  </Grid></CardContent></Card>;
}

export default StadiumMap;
