import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography, Chip, Avatar, Grid } from "@mui/material";
import ProductForm from "../components/Products/ProductForm";

const initialProducts = [
  {
    key: "1",
    name: "Cotton Night Suit for Women",
    price: 999,
    discountPrice: 799,
    status: true,
    featured: true,
    images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80"],
    category: "1",
    brand: "b1",
    badges: ["New", "Trending"]
  },
  {
    key: "2",
    name: "Lace Corset",
    price: 1499,
    discountPrice: 1299,
    status: false,
    featured: false,
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80"],
    category: "2",
    brand: "b2",
    badges: ["Best Seller"]
  }
];

const ProductsPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = (key) => {
    setProducts((prev) => prev.filter((p) => p.key !== key));
    setMessage("Product deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingProduct) {
        setProducts((prev) => prev.map((p) => (p.key === editingProduct.key ? { ...p, ...values } : p)));
        setMessage("Product updated successfully");
      } else {
        setProducts((prev) => [
          ...prev,
          { ...values, key: Date.now().toString() },
        ]);
        setMessage("Product added successfully");
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
              Products
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Product
            </Button>
          </Box>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Image</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Name</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Price</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Badges</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      {row.images && row.images.length > 0 ? (
                        <Avatar
                          src={row.images[0]}
                          variant="rounded"
                          sx={{ width: 56, height: 56, borderRadius: 2 }}
                        />
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Typography variant="body2" fontWeight="bold">
                        {row.name}
                      </Typography>
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Typography variant="body2">
                        ₹{row.discountPrice || row.price} {row.discountPrice && <del style={{ color: '#888', marginLeft: 4 }}>₹{row.price}</del>}
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
                      <Grid container spacing={0.5}>
                        {row.badges && row.badges.map((badge) => (
                          <Grid item key={badge}>
                            <Chip label={badge} size="small" color="primary" />
                          </Grid>
                        ))}
                      </Grid>
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
          {editingProduct ? "Edit Product" : "Add Product"}
        </DialogTitle>
        <DialogContent>
          <ProductForm
            initialValues={editingProduct || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ProductsPage;
