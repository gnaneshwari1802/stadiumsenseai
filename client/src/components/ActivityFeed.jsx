import { useEffect, useState } from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import socket from "../services/socket";
import { getActivities } from "../services/activityApi";

function ActivityFeed() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const loadActivities = async () => { try { const response = await getActivities(); if (response.success) setActivities(response.data); } catch (error) { console.error("Unable to load activities:", error); } };
    const handleActivities = (data) => { if (Array.isArray(data)) setActivities(data); };
    loadActivities(); socket.on("activityUpdate", handleActivities);
    return () => socket.off("activityUpdate", handleActivities);
  }, []);
  return <Card elevation={8} sx={{ borderRadius: 4 }}><CardContent><Typography variant="h5" fontWeight="bold">Activity Feed</Typography><Stack spacing={2} mt={2}>{activities.map((activity) => <div key={activity._id}><Typography fontWeight="bold">{activity.action}</Typography><Typography variant="body2">{activity.description}</Typography></div>)}</Stack></CardContent></Card>;
}

export default ActivityFeed;
