import { Box, Card, CardContent, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LocalParkingRoundedIcon from "@mui/icons-material/LocalParkingRounded";
import ThermostatRoundedIcon from "@mui/icons-material/ThermostatRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import { motion } from "framer-motion";

const MotionCard = motion.create(Card);

function DashboardCards({ dashboard = {} }) {
  const parkingCapacity = dashboard.parkingCapacity || 200;
  const cards = [
    { label: "Crowd density", value: `${dashboard.crowdDensity ?? 0}%`, detail: dashboard.crowdLevel || "Monitoring", progress: dashboard.crowdDensity ?? 0, color: "#6366f1", icon: <GroupsRoundedIcon /> },
    { label: "Parking occupied", value: `${dashboard.parkingOccupied ?? 0}/${parkingCapacity}`, detail: `${dashboard.parkingAvailable ?? parkingCapacity} spaces available`, progress: ((dashboard.parkingOccupied ?? 0) / parkingCapacity) * 100, color: "#10b981", icon: <LocalParkingRoundedIcon /> },
    { label: "Temperature", value: `${dashboard.temperature ?? 0}°C`, detail: dashboard.weather || "Loading weather", progress: Math.min((dashboard.temperature ?? 0) * 2.5, 100), color: "#f59e0b", icon: <ThermostatRoundedIcon /> },
    { label: "Security alerts", value: dashboard.securityAlerts ?? 0, detail: (dashboard.securityAlerts ?? 0) ? "Needs attention" : "All clear", progress: Math.min((dashboard.securityAlerts ?? 0) * 20, 100), color: "#ef4444", icon: <SecurityRoundedIcon /> },
  ];

  return <Grid container spacing={2.25}>
    {cards.map((card, index) => <Grid key={card.label} size={{ xs: 12, sm: 6, lg: 3 }}>
      <MotionCard initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }} whileHover={{ y: -4 }}
        sx={{ height: "100%", borderRadius: 4, border: "1px solid", borderColor: "divider", boxShadow: "0 8px 24px rgba(15,23,42,0.07)" }}>
        <CardContent sx={{ p: 2.25, "&:last-child": { pb: 2.25 } }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>{card.label}</Typography>
              <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5, letterSpacing: "-0.04em" }}>{card.value}</Typography>
            </Box>
            <Box sx={{ color: card.color, bgcolor: `${card.color}1a`, width: 44, height: 44, display: "grid", placeItems: "center", borderRadius: 3 }}>{card.icon}</Box>
          </Stack>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>{card.detail}</Typography>
          <LinearProgress variant="determinate" value={card.progress} sx={{ mt: 1, height: 6, borderRadius: 10, bgcolor: `${card.color}1a`, "& .MuiLinearProgress-bar": { bgcolor: card.color, borderRadius: 10 } }} />
        </CardContent>
      </MotionCard>
    </Grid>)}
  </Grid>;
}

export default DashboardCards;
