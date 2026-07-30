import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";

function PredictionCard({ dashboard }) {
  const crowdRisk = dashboard.crowdDensity >= 80 ? "High" : dashboard.crowdDensity >= 60 ? "Medium" : "Low";
  const parkingRisk = dashboard.parkingAvailable <= 20 ? "High" : dashboard.parkingAvailable <= 60 ? "Medium" : "Low";
  const securitySuggestion = dashboard.securityAlerts > 0 ? "Deploy security staff to the active gate." : "Maintain standard security patrols.";
  const color = crowdRisk === "High" || parkingRisk === "High" ? "error" : crowdRisk === "Medium" || parkingRisk === "Medium" ? "warning" : "success";
  return <Card elevation={8} sx={{ mt: 3, borderRadius: 4 }}><CardContent><Typography variant="h6"><PsychologyIcon color="primary" sx={{ mr: 1, verticalAlign: "bottom" }} />AI Prediction</Typography><Stack spacing={1} mt={2}><Typography>Crowd risk: {crowdRisk}</Typography><Typography>Parking congestion: {parkingRisk}</Typography><Typography>Security suggestion: {securitySuggestion}</Typography></Stack><Chip sx={{ mt: 2 }} color={color} label={dashboard.aiPrediction || `${crowdRisk} operational risk`} /></CardContent></Card>;
}

export default PredictionCard;
