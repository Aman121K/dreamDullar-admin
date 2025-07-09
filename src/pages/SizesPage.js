import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography } from "@mui/material";
import SizeForm from "../components/Sizes/SizeForm";

const initialSizes = [
  { key: "1", name: "XS", description: "Extra Small" },
  { key: "2", name: "S", description: "Small" },
  { key: "3", name: "M", description: "Medium" },
  { key: "4", name: "L", description: "Large" },
  { key: "5", name: "XL", description: "Extra Large" },
];

const SizesPage = () => {
  const [sizes, setSizes] = useState(initialSizes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSize, setEditingSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setEditingSize(null);
    setDialogOpen(true);
  };

  const handleEdit = (size) => {
    setEditingSize(size);
    setDialogOpen(true);
  };

  const handleDelete = (key) => {
    setSizes((prev) => prev.filter((s) => s.key !== key));
    setMessage("Size deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingSize) {
        setSizes((prev) => prev.map((s) => (s.key === editingSize.key ? { ...s, ...values } : s)));
        setMessage("Size updated successfully");
      } else {
        setSizes((prev) => [
          ...prev,
          { ...values, key: Date.now().toString() },
        ]);
        setMessage("Size added successfully");
      }
      setLoading(false);
      setDialogOpen(false);
      setTimeout(() => setMessage(""), 3000);
    }, 700);
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
              Sizes
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Size
            </Button>
          </Box>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Size Name</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Description</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.name}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.description}</td>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSize ? "Edit Size" : "Add Size"}
        </DialogTitle>
        <DialogContent>
          <SizeForm
            initialValues={editingSize || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SizesPage;
