import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import StadiumRoundedIcon from "@mui/icons-material/StadiumRounded";
import { registerUser } from "../services/authApi";
import { useNavigate } from "react-router-dom";

function Register({ mode, toggleTheme }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(false);
  const register = async (event) => {
    event.preventDefault(); setNotice(null);
    if (!form.name || !form.email || !form.password) return setNotice({ type: "error", text: "Complete all fields to create your account." });
    if (form.password.length < 6) return setNotice({ type: "error", text: "Use a password with at least 6 characters." });
    setLoading(true);
    try { await registerUser(form); setNotice({ type: "success", text: "Account created. Redirecting you to sign in…" }); setTimeout(() => navigate("/login"), 1000); }
    catch (err) { setNotice({ type: "error", text: err.response?.data?.message || err.message || "Unable to create your account." }); }
    finally { setLoading(false); }
  };
  return <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2, background: "radial-gradient(circle at top right, rgba(99,102,241,.20), transparent 35%), radial-gradient(circle at bottom left, rgba(16,185,129,.16), transparent 35%)" }}>
    <Tooltip title={mode === "light" ? "Use dark theme" : "Use light theme"}><IconButton onClick={toggleTheme} sx={{ position: "fixed", top: 16, right: 16 }} color="primary">{mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}</IconButton></Tooltip>
    <Card sx={{ width: "100%", maxWidth: 440, borderRadius: 5, boxShadow: "0 24px 60px rgba(15,23,42,.18)" }}><CardContent sx={{ p: { xs: 3, sm: 4 }, "&:last-child": { pb: { xs: 3, sm: 4 } } }}>
      <Stack alignItems="center" spacing={1} sx={{ mb: 3 }}><Box sx={{ p: 1.25, bgcolor: "primary.main", color: "primary.contrastText", borderRadius: 3, display: "grid" }}><StadiumRoundedIcon /></Box><Typography variant="h4" fontWeight={800}>Create account</Typography><Typography color="text.secondary" textAlign="center">Start monitoring your stadium with confidence.</Typography></Stack>
      <Box component="form" onSubmit={register}><Stack spacing={2}>
        {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
        <TextField label="Full name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth autoFocus />
        <TextField label="Email address" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} fullWidth />
        <TextField label="Password" type="password" helperText="At least 6 characters" autoComplete="new-password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth />
        <Button type="submit" variant="contained" size="large" disabled={loading}>{loading ? "Creating account…" : "Create account"}</Button>
        <Button variant="text" onClick={() => navigate("/login")}>Already have an account? Sign in</Button>
      </Stack></Box>
    </CardContent></Card>
  </Box>;
}
export default Register;
