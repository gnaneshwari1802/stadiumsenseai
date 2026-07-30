import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function AnalyticsCard({ dashboard }) {
  const safetyScore = Math.max(0, 100 - (dashboard.securityAlerts * 10) - Math.max(0, dashboard.crowdDensity - 70));
  return <Card elevation={8} sx={{ mt: 3, borderRadius: 4 }}><CardContent><Typography variant="h5" fontWeight="bold">Stadium Analytics</Typography><Grid container spacing={3} mt={2}><Grid size={4}><Box textAlign="center"><TrendingUpIcon color="success" sx={{ fontSize: 50 }} /><Typography variant="h4">{safetyScore}%</Typography><Typography>Safety Score</Typography></Box></Grid><Grid size={4}><Box textAlign="center"><Typography variant="h4">{dashboard.securityAlerts}</Typography><Typography>AI Alerts</Typography></Box></Grid><Grid size={4}><Box textAlign="center"><Typography variant="h4">99%</Typography><Typography>Camera Uptime</Typography></Box></Grid></Grid></CardContent></Card>;
}

export default AnalyticsCard;
