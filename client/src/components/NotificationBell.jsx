import { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import socket from "../services/socket";
import {
  getNotifications,
  markRead,
} from "../services/notificationApi";

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    loadNotifications();

    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [
        notification,
        ...prev,
      ]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  const loadNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  const unread = notifications.filter(
    (n) => !n.read
  ).length;

  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRead = async (id) => {
    await markRead(id);

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id
          ? { ...n, read: true }
          : n
      )
    );
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
      >
        <Badge
          badgeContent={unread}
          color="error"
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {notifications.length === 0 && (
          <MenuItem>No Notifications</MenuItem>
        )}

        {notifications.map((item) => (
          <MenuItem
            key={item._id}
            onClick={() => handleRead(item._id)}
          >
            <div>
              <strong>{item.title}</strong>

              <br />

              {item.message}
            </div>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default NotificationBell;