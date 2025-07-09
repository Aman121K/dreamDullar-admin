import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography, Chip } from "@mui/material";
import DiscountForm from "../components/Discounts/DiscountForm";

const initialDiscounts = [
  {
    key: "1",
    name: "SUMMER20",
    type: "percentage",
    value: 20,
    minOrderAmount: 100,
    maxDiscount: 200,
    applicableCategories: ["1", "2"],
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: true,
    usageLimit: 1000,
    description: "Summer collection discount for all customers"
  },
  {
    key: "2",
    name: "FLASH50",
    type: "fixed",
    value: 50,
    minOrderAmount: 200,
    maxDiscount: 100,
    applicableCategories: ["3", "4"],
    startDate: "2024-05-15",
    endDate: "2024-06-15",
    status: true,
    usageLimit: 500,
    description: "Flash sale on kids collection"
  }
];

const mockCategories = {
  "1": "Night Suits",
  "2": "Corsets", 
  "3": "Kids Night Suits",
  "4": "Lace Corsets"
};

const DiscountsPage = () => {
  const [discounts, setDiscounts] = useState(initialDiscounts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setEditingDiscount(null);
    setDialogOpen(true);
  };

  const handleEdit = (discount) => {
    setEditingDiscount(discount);
    setDialogOpen(true);
  };

  const handleDelete = (key) => {
    setDiscounts((prev) => prev.filter((d) => d.key !== key));
    setMessage("Discount deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingDiscount) {
        setDiscounts((prev) => prev.map((d) => (d.key === editingDiscount.key ? { ...d, ...values } : d)));
        setMessage("Discount updated successfully");
      } else {
        setDiscounts((prev) => [
          ...prev,
          { ...values, key: Date.now().toString() },
        ]);
        setMessage("Discount added successfully");
      }
      setLoading(false);
      setDialogOpen(false);
      setTimeout(() => setMessage(""), 3000);
    }, 700);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
  };

  const getCategoriesText = (categoryKeys) => {
    if (!categoryKeys || categoryKeys.length === 0) return 'All Categories';
    return categoryKeys.map(key => mockCategories[key]).join(', ');
  };

  return (
    <Box>
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" component="h2">
              Discounts
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Discount
            </Button>
          </Box>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Code</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Type</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Value</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Min Order</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Categories</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Dates</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Typography variant="body2" fontWeight="bold">
                        {row.name}
                      </Typography>
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Chip 
                        label={row.type === 'percentage' ? 'Percentage' : 'Fixed'} 
                        color={row.type === 'percentage' ? 'primary' : 'secondary'}
                        size="small"
                      />
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Typography variant="body2">
                        {row.type === 'percentage' ? `${row.value}%` : `$${row.value}`}
                      </Typography>
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Typography variant="body2">
                        ${row.minOrderAmount || '-'}
                      </Typography>
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Typography variant="caption" display="block">
                        {getCategoriesText(row.applicableCategories)}
                      </Typography>
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Chip 
                        label={row.status ? 'Active' : 'Inactive'} 
                        color={row.status ? 'success' : 'error'}
                        size="small"
                      />
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Typography variant="caption" display="block">
                        {formatDate(row.startDate)} - {formatDate(row.endDate)}
                      </Typography>
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>
                      <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleEdit(row)}>
                        Edit
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingDiscount ? "Edit Discount" : "Add Discount"}
        </DialogTitle>
        <DialogContent>
          <DiscountForm
            initialValues={editingDiscount || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DiscountsPage;
