import React, { useState } from "react";
import { Card, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await api.auth.login({
        email: formData.email,
        password: formData.password
      });

      console.log("Login successful, storing token");
      
      // Store the authentication token
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(data.user || { email: formData.email }));
      
      // Navigate to dashboard
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Card sx={{ width: 400, p: 4, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 3 }}>
          Admin Login
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage; 