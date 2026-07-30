import { useEffect, useState } from "react";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import socket from "../services/socket";
import { getNotifications } from "../services/notificationApi";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const loadNotifications = async () => { try { const response = await getNotifications(); if (response.success) setNotifications(response.data); } catch (error) { console.error("Unable to load notifications:", error); } };
    const handleNotification = (notification) => setNotifications((current) => [notification, ...current].slice(0, 20));
    loadNotifications(); socket.on("notification", handleNotification);
    return () => socket.off("notification", handleNotification);
  }, []);
  return <Card elevation={8} sx={{ borderRadius: 4 }}><CardContent><Typography variant="h5" fontWeight="bold">Notifications</Typography><Stack spacing={2} mt={2}>{notifications.length ? notifications.map((item) => <Stack key={item._id || item.id} spacing={0.5}><Typography fontWeight="bold">{item.title}</Typography><Typography variant="body2">{item.message}</Typography><Chip size="small" label={item.priority} color={item.priority === "high" ? "error" : "info"} sx={{ width: "fit-content" }} /></Stack>) : <Typography color="text.secondary">No active notifications.</Typography>}</Stack></CardContent></Card>;
}

export default Notifications;
