import { Box, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import heroImage from "../assets/hero.png";

function CameraFeed({ dashboard }) {
  const monitoringLocation = dashboard?.activeGate || "Main Entrance";

  return (
    <Card elevation={8} sx={{ mt: 3, borderRadius: 4 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Box>
            <Typography variant="h5" fontWeight="bold">Stadium Camera Preview</Typography>
            <Typography variant="body2" color="text.secondary">Monitoring location: {monitoringLocation}</Typography>
          </Box>
          <Chip label="Preview" size="small" />
        </Stack>
        <img src={heroImage} alt="Stadium camera preview" style={{ width: "100%", borderRadius: 10, marginTop: 20, display: "block" }} />
      </CardContent>
    </Card>
  );
}

export default CameraFeed;
