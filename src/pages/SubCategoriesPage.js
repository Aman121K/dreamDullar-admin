import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography } from "@mui/material";
import SubCategoryForm from "../components/SubCategories/SubCategoryForm";

const mockCategories = [
  { key: "1", name: "Night Suits" },
  { key: "2", name: "Corsets" },
];

const initialSubCategories = [
  { key: "1", name: "Kids Night Suits", description: "For children", category: "1", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=120&q=80" },
  { key: "2", name: "Lace Corsets", description: "Lace style", category: "2", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=120&q=80" },
];

const SubCategoriesPage = () => {
  const [subCategories, setSubCategories] = useState(initialSubCategories);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setEditingSubCategory(null);
    setDialogOpen(true);
  };

  const handleEdit = (subCategory) => {
    setEditingSubCategory(subCategory);
    setDialogOpen(true);
  };

  const handleDelete = (key) => {
    setSubCategories((prev) => prev.filter((c) => c.key !== key));
    setMessage("Subcategory deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingSubCategory) {
        setSubCategories((prev) => prev.map((c) => (c.key === editingSubCategory.key ? { ...c, ...values } : c)));
        setMessage("Subcategory updated successfully");
      } else {
        setSubCategories((prev) => [
          ...prev,
          { ...values, key: Date.now().toString() },
        ]);
        setMessage("Subcategory added successfully");
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
              SubCategories
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Subcategory
            </Button>
          </Box>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Image</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Subcategory Name</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Category</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Description</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      {row.image ? (
                        <img src={row.image} alt="subcategory" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.name}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{mockCategories.find(c => c.key === row.category)?.name || '-'}</td>
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
          {editingSubCategory ? "Edit Subcategory" : "Add Subcategory"}
        </DialogTitle>
        <DialogContent>
          <SubCategoryForm
            initialValues={editingSubCategory || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SubCategoriesPage;
