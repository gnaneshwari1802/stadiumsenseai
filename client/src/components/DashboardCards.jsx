import {
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SecurityIcon from "@mui/icons-material/Security";

import { motion } from "framer-motion";

const MotionCard = motion.create(Card);

function DashboardCards({
  dashboard = {},
}) {
  const crowdDensity = dashboard?.crowdDensity ?? 0;
  const parkingOccupied = dashboard?.parkingOccupied ?? 0;
  const totalParking = dashboard?.parkingCapacity ?? 200;
  const temperature = dashboard?.temperature ?? 0;
  const securityAlerts = dashboard?.securityAlerts ?? 0;
  const updateLabel = dashboard?.dataSource === "telemetry"
    ? "Live telemetry"
    : dashboard?.dataSource === "demo"
      ? "Demo data"
      : "Waiting for telemetry";

  const cards = [
    {
      title: "Crowd Density",
      value: `${crowdDensity}%`,
      progress: crowdDensity,
      color: "#2196f3",
      icon: <GroupsIcon sx={{ fontSize: 45 }} />,
    },
    {
      title: "Parking",
      value: `${parkingOccupied}/${totalParking}`,
      progress: (parkingOccupied / totalParking) * 100,
      color: "#43a047",
      icon: <LocalParkingIcon sx={{ fontSize: 45 }} />,
    },
    {
      title: "Temperature",
      value: `${temperature}°C`,
      progress: Math.min(temperature * 2.5, 100),
      color: "#fb8c00",
      icon: <ThermostatIcon sx={{ fontSize: 45 }} />,
    },
    {
      title: "Security Alerts",
      value: securityAlerts,
      progress: Math.min(securityAlerts * 20, 100),
      color: "#e53935",
      icon: <SecurityIcon sx={{ fontSize: 45 }} />,
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <MotionCard
            whileHover={{
              scale: 1.04,
              y: -6,
            }}
            transition={{
              duration: 0.25,
            }}
            elevation={8}
            sx={{
              borderRadius: 4,
              background:
                "linear-gradient(135deg,#1e293b,#334155)",
              color: "white",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#cbd5e1",
                    }}
                  >
                    {card.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      mt: 1,
                    }}
                  >
                    {card.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    color: card.color,
                    opacity: 0.95,
                  }}
                >
                  {card.icon}
                </Box>
              </Box>

              <LinearProgress
                variant="determinate"
                value={card.progress}
                sx={{
                  mt: 3,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: "#475569",

                  "& .MuiLinearProgress-bar": {
                    backgroundColor: card.color,
                    borderRadius: 10,
                  },
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  color: "#94a3b8",
                  mt: 1,
                  display: "block",
                }}
              >
                {updateLabel}
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardCards;
