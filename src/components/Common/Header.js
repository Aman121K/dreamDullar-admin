import React from "react";
import { AppBar, Toolbar, Avatar, Button, Typography, Box } from "@mui/material";
import { Person, Logout } from "@mui/icons-material";

const AppHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
      <Avatar sx={{ mr: 1 }}>
        <Person />
      </Avatar>
      <Typography variant="body1" sx={{ mr: 2, fontWeight: 500 }}>
        Admin
      </Typography>
      <Button
        color="inherit"
        startIcon={<Logout />}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
};

export default AppHeader; 