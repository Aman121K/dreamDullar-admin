import React, { useState } from "react";
import { Card, CardContent, Button, Box, Typography, Chip, Avatar, Grid, Alert, Dialog, DialogTitle, DialogContent } from "@mui/material";
import CustomerDetails from "../components/Customers/CustomerDetails";

const initialCustomers = [
  {
    key: "1",
    name: "Vikas Tiwari",
    email: "vikas@email.com",
    phone: "+91-9876543210",
    registered: "2024-06-01",
    status: true,
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    key: "2",
    name: "Priya Sharma",
    email: "priya@email.com",
    phone: "+91-9123456789",
    registered: "2024-05-20",
    status: false,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  }
];

const CustomersPage = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [message, setMessage] = useState("");
  const [viewCustomer, setViewCustomer] = useState(null);

  const handleDelete = (key) => {
    setCustomers((prev) => prev.filter((c) => c.key !== key));
    setMessage("Customer deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <Box>
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>
      )}
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" mb={2}>
            Customers
          </Typography>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Avatar</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Name</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Email</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Phone</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Registered</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Avatar src={row.avatar} alt={row.name} />
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.name}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.email}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.phone}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.registered}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Chip label={row.status ? 'Active' : 'Inactive'} color={row.status ? 'success' : 'error'} size="small" />
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>
                      <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => setViewCustomer(row)}>
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
      {/* Customer Details Dialog */}
      <Dialog open={!!viewCustomer} onClose={() => setViewCustomer(null)} maxWidth="sm" fullWidth>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          <CustomerDetails customer={viewCustomer} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CustomersPage;
