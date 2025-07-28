import React from "react";
import { Box, Typography, Grid, Card, CardContent, Paper } from "@mui/material";
import { 
  ShoppingCart, 
  People, 
  AttachMoney, 
  TrendingUp,
  Dashboard as DashboardIcon 
} from "@mui/icons-material";

const DashboardPage = () => {
  const stats = [
    {
      title: "Total Products",
      value: "1,234",
      icon: <ShoppingCart />,
      color: "#3f51b5"
    },
    {
      title: "Total Customers",
      value: "5,678",
      icon: <People />,
      color: "#4caf50"
    },
    {
      title: "Total Orders",
      value: "2,345",
      icon: <AttachMoney />,
      color: "#ff9800"
    },
    {
      title: "Revenue",
      value: "$45,678",
      icon: <TrendingUp />,
      color: "#f44336"
    }
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <DashboardIcon sx={{ mr: 2, fontSize: 32, color: '#3f51b5' }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: '#2c3e50' }}>
          Dashboard
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%', 
              background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}25 100%)`,
              border: `1px solid ${stat.color}30`,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4
              }
            }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                  color: 'white',
                  mb: 2
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: stat.color }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome to your admin dashboard! This is where you can manage all aspects of your e-commerce platform.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 300 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use the sidebar navigation to access different sections of your admin panel.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
