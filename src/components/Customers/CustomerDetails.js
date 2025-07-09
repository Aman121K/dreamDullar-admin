import React from "react";
import { Card, CardContent, Typography, Avatar, Grid, Chip, Box } from "@mui/material";

const CustomerDetails = ({ customer }) => {
  if (!customer) return null;
  return (
    <Card sx={{ maxWidth: 480, mx: 'auto', my: 2, boxShadow: 4 }}>
      <CardContent>
        <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
          <Avatar src={customer.avatar} alt={customer.name} sx={{ width: 80, height: 80, mb: 1 }} />
          <Typography variant="h6" fontWeight={700}>{customer.name}</Typography>
          <Chip
            label={customer.status ? 'Active' : 'Inactive'}
            color={customer.status ? 'success' : 'error'}
            size="small"
            sx={{ mt: 1 }}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography variant="subtitle2" color="text.secondary">Email</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1">{customer.email}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1">{customer.phone}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="subtitle2" color="text.secondary">Registered</Typography>
          </Grid>
          <Grid item xs={7}>
            <Typography variant="body1">{customer.registered}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomerDetails; 