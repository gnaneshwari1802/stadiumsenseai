import { useEffect, useRef, useState } from "react";
import { Alert, Collapse } from "@mui/material";
import socket from "../services/socket";

function AlertBanner() {
  const [alert, setAlert] = useState(null);
  const timeoutRef = useRef();
  useEffect(() => { const handleNotification = (data) => { if (data.priority !== "high") return; setAlert(data); clearTimeout(timeoutRef.current); timeoutRef.current = setTimeout(() => setAlert(null), 7000); }; socket.on("notification", handleNotification); return () => { socket.off("notification", handleNotification); clearTimeout(timeoutRef.current); }; }, []);
  return <Collapse in={Boolean(alert)}>{alert && <Alert severity="error" sx={{ mb: 2 }}><strong>{alert.title}</strong><br />{alert.message}</Alert>}</Collapse>;
}

export default AlertBanner;
