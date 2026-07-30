import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import StadiumRoundedIcon from "@mui/icons-material/StadiumRounded";
import { loginUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function Login({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (!form.email || !form.password) return setError("Enter your email and password to continue.");
    setLoading(true);
    try {
      const res = await loginUser(form);
      if (!res.success || !res.token) throw new Error(res.message || "Login failed");
      localStorage.setItem("token", res.token);
      navigate("/", { replace: true });
    } catch (err) { setError(err.response?.data?.message || err.message || "Unable to sign in. Please try again."); }
    finally { setLoading(false); }
  };
  return <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2, background: "radial-gradient(circle at top left, rgba(99,102,241,.20), transparent 35%), radial-gradient(circle at bottom right, rgba(16,185,129,.16), transparent 35%)" }}>
    <Tooltip title={mode === "light" ? "Use dark theme" : "Use light theme"}><IconButton onClick={toggleTheme} sx={{ position: "fixed", top: 16, right: 16 }} color="primary">{mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}</IconButton></Tooltip>
    <Card sx={{ width: "100%", maxWidth: 440, borderRadius: 5, boxShadow: "0 24px 60px rgba(15,23,42,.18)" }}><CardContent sx={{ p: { xs: 3, sm: 4 }, "&:last-child": { pb: { xs: 3, sm: 4 } } }}>
      <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}><Box sx={{ p: 1.25, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 3, display: "grid" }}><StadiumRoundedIcon /></Box><Typography variant="h4" fontWeight={800}>Welcome back</Typography><Typography color="text.secondary" textAlign="center">Sign in to manage your stadium operations.</Typography></Stack>
      <Box component="form" onSubmit={submit}><Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField label="Email address" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth autoFocus />
        <TextField label="Password" type="password" autoComplete="current-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth />
        <Button type="submit" variant="contained" size="large" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
        <Button variant="text" onClick={() => navigate("/register")}>New here? Create an account</Button>
      </Stack></Box>
    </CardContent></Card>
  </Box>;
}
export default Login;
