import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { motion } from "framer-motion";

function Navbar({
  notifications = [],
  darkMode = true,
  toggleTheme,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={8}
      sx={{
        backdropFilter: "blur(15px)",
        background: "rgba(15,23,42,.95)",
      }}
    >
      <Toolbar>

        {/* Logo */}

        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          🏟 StadiumSense AI
        </Typography>

        {/* Dashboard */}

        <Tooltip title="Dashboard">
          <IconButton color="inherit">
            <DashboardIcon />
          </IconButton>
        </Tooltip>

        {/* Analytics */}

        <Tooltip title="Analytics">
          <IconButton color="inherit">
            <AnalyticsIcon />
          </IconButton>
        </Tooltip>

        {/* AI */}

        <Tooltip title="AI Assistant">
          <IconButton color="inherit">
            <SmartToyIcon />
          </IconButton>
        </Tooltip>

        {/* Theme */}

        <Tooltip title="Theme">
          <IconButton
            color="inherit"
            onClick={toggleTheme}
          >
            {darkMode ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon />
            )}
          </IconButton>
        </Tooltip>

        {/* Notifications */}

        <Tooltip title="Notifications">
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="error"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Avatar */}

        <motion.div whileHover={{ scale: 1.08 }}>
          <Avatar
            sx={{
              ml: 2,
              cursor: "pointer",
              bgcolor: "primary.main",
            }}
            onClick={openMenu}
          >
            G
          </Avatar>
        </motion.div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <MenuItem onClick={closeMenu}>
            Profile
          </MenuItem>

          <MenuItem onClick={closeMenu}>
            Settings
          </MenuItem>

          <MenuItem
            sx={{
              color: "red",
            }}
            onClick={() => {

              localStorage.removeItem("token");

              window.location.href = "/login";

            }}
          >
            Logout
          </MenuItem>

        </Menu>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;