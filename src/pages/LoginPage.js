import React, { useState } from "react";
import { Card, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    
    if (!formData.username || !formData.password) {
      setError("Please enter both username and password");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      if (
        formData.username === "vikas" &&
        formData.password === "vikas"
      ) {
        console.log("Login successful, setting localStorage");
        localStorage.setItem("isAuthenticated", "true");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      } else {
        console.log("Login failed");
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 700);
  };

  const testLogin = () => {
    console.log("Test login clicked");
    setFormData({ username: "vikas", password: "vikas" });
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 100);
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
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
          
          <Button
            fullWidth
            variant="outlined"
            onClick={testLogin}
            sx={{ mt: 1 }}
          >
            Test Login (Bypass Form)
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default LoginPage; 