import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  TextField,
  Divider,
  Chip,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

import { motion } from "framer-motion";

import { getHistory } from "../services/historyApi";

function ChatHistory() {
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadHistory = async () => {
    try {
      const res = await getHistory();

      if (res.success) {
        setHistory(res.data || []);
        setFiltered(res.data || []);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadHistory();

    const interval = setInterval(loadHistory, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(history);
      return;
    }

    const filteredData = history.filter((chat) =>
      chat.userMessage
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFiltered(filteredData);
  }, [search, history]);

  if (loading) {
    return (
      <Card elevation={8} sx={{ mt: 3, borderRadius: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 5,
            }}
          >
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      elevation={8}
      sx={{
        mt: 3,
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
        >
          💬 Chat History
        </Typography>

        <TextField
          fullWidth
          placeholder="Search previous chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3 }}
          slotProps={{
  input:{
    startAdornment:(
      <InputAdornment position="start">
        <SearchIcon color="primary"/>
      </InputAdornment>
    )
  }
}}
        />

        <Box
          sx={{
            maxHeight: 600,
            overflowY: "auto",
            pr: 1,
          }}
        >
          {filtered.length === 0 && (
            <Typography
              align="center"
              sx={{
                color: "gray",
                mt: 3,
              }}
            >
              No previous chats found.
            </Typography>
          )}

          {filtered.map((chat, index) => (
            <motion.div
              key={chat._id || index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg,#1e293b,#334155)",
                  color: "white",
                }}
              >
                <CardContent>
                  {/* User */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#1976d2",
                        mr: 2,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        fontWeight="bold"
                        color="#90caf9"
                      >
                        You
                      </Typography>

                      <Typography>
                        {chat.userMessage}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider
                    sx={{
                      my: 2,
                      borderColor: "#475569",
                    }}
                  />

                  {/* AI */}

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#26a69a",
                        mr: 2,
                      }}
                    >
                      <SmartToyIcon />
                    </Avatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        fontWeight="bold"
                        color="#80cbc4"
                      >
                        Stadium AI
                      </Typography>

                      <Typography>
                        {chat.aiResponse}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 3,
                      flexWrap: "wrap",
                      gap: 1,
                    }}
                  >
                    <Chip
                      color="primary"
                      label={new Date(
                        chat.createdAt
                      ).toLocaleDateString()}
                    />

                    <Chip
                      color="success"
                      label={new Date(
                        chat.createdAt
                      ).toLocaleTimeString()}
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ChatHistory;