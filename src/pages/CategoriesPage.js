import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography } from "@mui/material";
import CategoryForm from "../components/Categories/CategoryForm";

const initialCategories = [
  { key: "1", name: "Night Suits", description: "Comfortable nightwear", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=120&q=80" },
  { key: "2", name: "Corsets", description: "Stylish corsets", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=120&q=80" },
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setEditingCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setDialogOpen(true);
  };

  const handleDelete = (key) => {
    setCategories((prev) => prev.filter((c) => c.key !== key));
    setMessage("Category deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingCategory) {
        setCategories((prev) => prev.map((c) => (c.key === editingCategory.key ? { ...c, ...values } : c)));
        setMessage("Category updated successfully");
      } else {
        setCategories((prev) => [
          ...prev,
          { ...values, key: Date.now().toString() },
        ]);
        setMessage("Category added successfully");
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
              Categories
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Category
            </Button>
          </Box>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Image</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Category Name</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Description</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      {row.image ? (
                        <img src={row.image} alt="category" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                      ) : (
                        <span>-</span>
                      )}
                    </td>
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
          {editingCategory ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <CategoryForm
            initialValues={editingCategory || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default CategoriesPage;
