import React from "react";
import { Card, CardContent, Typography, Chip, Box, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const OrderDetails = ({ order }) => {
  if (!order) return null;
  const total = order.items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', my: 2, boxShadow: 4 }}>
      <CardContent>
        <Box mb={2}>
          <Typography variant="h6" fontWeight={700} mb={1}>Order #{order.orderId}</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Customer</Typography>
              <Typography variant="body1">{order.customer}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Date</Typography>
              <Typography variant="body1">{order.date}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Status</Typography>
              <Chip label={order.status} color={order.status === 'Completed' ? 'success' : order.status === 'Pending' ? 'warning' : 'error'} size="small" />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.secondary">Total</Typography>
              <Typography variant="body1">₹{total}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Typography variant="subtitle2" mb={1}>Order Items</Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.product}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>₹{item.qty * item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default OrderDetails; 