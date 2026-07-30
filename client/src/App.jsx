import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [mode, setMode] = useState(() => localStorage.getItem("themeMode") || "light");
  const toggleTheme = () => {
    setMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", nextMode);
      return nextMode;
    });
  };
  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: mode === "light" ? "#1565c0" : "#90caf9" },
      background: { default: mode === "light" ? "#f5f7fb" : "#101827", paper: mode === "light" ? "#ffffff" : "#182235" },
    },
  }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login mode={mode} toggleTheme={toggleTheme} />} />

          <Route path="/register" element={<Register mode={mode} toggleTheme={toggleTheme} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
