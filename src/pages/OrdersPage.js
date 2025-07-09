import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography, Chip, Grid, TextField, MenuItem } from "@mui/material";
import OrderDetails from "../components/Orders/OrderDetails";

const mockCustomers = [
  { key: "1", name: "Vikas Tiwari" },
  { key: "2", name: "Priya Sharma" },
];
const mockProducts = [
  { key: "p1", name: "Cotton Night Suit for Women" },
  { key: "p2", name: "Lace Corset" },
];

const initialOrders = [
  {
    key: "o1",
    orderId: "ORD-1001",
    customer: "Vikas Tiwari",
    date: "2024-06-10",
    total: 1798,
    status: "Completed",
    items: [
      { product: "Cotton Night Suit for Women", qty: 1, price: 799 },
      { product: "Lace Corset", qty: 1, price: 999 },
    ]
  },
  {
    key: "o2",
    orderId: "ORD-1002",
    customer: "Priya Sharma",
    date: "2024-06-11",
    total: 1299,
    status: "Pending",
    items: [
      { product: "Lace Corset", qty: 1, price: 1299 },
    ]
  }
];

const OrderForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    customer: initialValues.customer || "",
    items: initialValues.items || [{ product: "", qty: 1, price: "" }],
    status: initialValues.status || "Pending",
    date: initialValues.date || new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (idx, field, value) => {
    const items = [...formData.items];
    items[idx][field] = value;
    setFormData({ ...formData, items });
  };

  const handleAddItem = () => {
    setFormData({ ...formData, items: [...formData.items, { product: "", qty: 1, price: "" }] });
  };

  const handleRemoveItem = (idx) => {
    setFormData({ ...formData, items: formData.items.filter((_, i) => i !== idx) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        select
        fullWidth
        label="Customer"
        name="customer"
        value={formData.customer}
        onChange={handleChange}
        required
        margin="normal"
      >
        {mockCustomers.map((c) => (
          <MenuItem key={c.key} value={c.name}>{c.name}</MenuItem>
        ))}
      </TextField>
      <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>Order Items</Typography>
      {formData.items.map((item, idx) => (
        <Grid container spacing={1} key={idx} alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={5}>
            <TextField
              select
              fullWidth
              label="Product"
              value={item.product}
              onChange={e => handleItemChange(idx, "product", e.target.value)}
              required
            >
              {mockProducts.map((p) => (
                <MenuItem key={p.key} value={p.name}>{p.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Qty"
              type="number"
              value={item.qty}
              onChange={e => handleItemChange(idx, "qty", e.target.value)}
              inputProps={{ min: 1 }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Price"
              type="number"
              value={item.price}
              onChange={e => handleItemChange(idx, "price", e.target.value)}
              inputProps={{ min: 0 }}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <Button color="error" onClick={() => handleRemoveItem(idx)} disabled={formData.items.length === 1}>Remove</Button>
          </Grid>
        </Grid>
      ))}
      <Button onClick={handleAddItem} sx={{ mb: 2 }}>Add Item</Button>
      <TextField
        select
        fullWidth
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        margin="normal"
      >
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
      </TextField>
      <TextField
        fullWidth
        label="Order Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 3 }}
      >
        {loading ? "Saving..." : "Save Order"}
      </Button>
    </Box>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [viewOrder, setViewOrder] = useState(null);

  const handleAdd = () => {
    setEditingOrder(null);
    setDialogOpen(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setDialogOpen(true);
  };

  const handleView = (order) => {
    setViewOrder(order);
  };

  const handleDelete = (key) => {
    setOrders((prev) => prev.filter((o) => o.key !== key));
    setMessage("Order deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingOrder) {
        setOrders((prev) => prev.map((o) => (o.key === editingOrder.key ? { ...o, ...values } : o)));
        setMessage("Order updated successfully");
      } else {
        setOrders((prev) => [
          ...prev,
          { ...values, key: Date.now().toString(), orderId: `ORD-${1000 + prev.length + 1}` },
        ]);
        setMessage("Order added successfully");
      }
      setLoading(false);
      setDialogOpen(false);
      setTimeout(() => setMessage(""), 3000);
    }, 700);
  };

  return (
    <Box>
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>
      )}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" component="h2">
              Orders
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Order
            </Button>
          </Box>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Order ID</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Customer</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Date</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Total</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.orderId}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.customer}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.date}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>₹{row.items.reduce((sum, item) => sum + (item.qty * item.price), 0)}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Chip label={row.status} color={row.status === 'Completed' ? 'success' : row.status === 'Pending' ? 'warning' : 'error'} size="small" />
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>
                      <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleView(row)}>
                        View
                      </Button>
                      <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(row.key)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
      {/* Order Details Dialog */}
      <Dialog open={!!viewOrder} onClose={() => setViewOrder(null)} maxWidth="md" fullWidth>
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent>
          <OrderDetails order={viewOrder} />
        </DialogContent>
      </Dialog>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingOrder ? "Edit Order" : "Add Order"}
        </DialogTitle>
        <DialogContent>
          <OrderForm
            initialValues={editingOrder || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OrdersPage;
