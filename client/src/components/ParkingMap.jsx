import { useEffect, useState } from "react";
import { Box, Card, CardContent, Grid, LinearProgress, Typography } from "@mui/material";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import socket from "../services/socket";

function ParkingMap({ dashboard }) {
  const [parking, setParking] = useState({ occupied: 0, available: 200, percentage: 0 });

  useEffect(() => {
    const handleParking = (data) => setParking(data);
    socket.on("parkingUpdate", handleParking);
    return () => socket.off("parkingUpdate", handleParking);
  }, []);

  const display = parking.occupied === 0 && dashboard ? {
    occupied: dashboard.parkingOccupied,
    available: dashboard.parkingAvailable,
    percentage: (dashboard.parkingOccupied / dashboard.parkingCapacity) * 100,
  } : parking;

  return <Card elevation={8} sx={{ mt: 3, borderRadius: 4 }}><CardContent>
    <Typography variant="h5" fontWeight="bold">Parking Monitor</Typography>
    <Grid container spacing={2} mt={1}>
      <Grid size={6}><Box textAlign="center"><LocalParkingIcon color="success" sx={{ fontSize: 50 }} /><Typography variant="h4">{display.available}</Typography><Typography>Available</Typography></Box></Grid>
      <Grid size={6}><Box textAlign="center"><LocalParkingIcon color="error" sx={{ fontSize: 50 }} /><Typography variant="h4">{display.occupied}</Typography><Typography>Occupied</Typography></Box></Grid>
    </Grid>
    <LinearProgress sx={{ mt: 3, height: 12 }} variant="determinate" value={Math.min(display.percentage || 0, 100)} />
  </CardContent></Card>;
}

export default ParkingMap;
