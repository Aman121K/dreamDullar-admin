import React, { useState } from "react";
import { Card, CardContent, CardActions, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography } from "@mui/material";
import BrandForm from "../components/Brands/BrandForm";
import BrandTable from "../components/Brands/BrandTable";

const initialBrands = [
  { key: "1", name: "Victoria's Secret", description: "Luxury lingerie brand", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Victoria%27s_Secret_logo.svg" },
  { key: "2", name: "Calvin Klein", description: "Modern essentials", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Calvin_klein_logo.svg" },
];

const BrandsPage = () => {
  const [brands, setBrands] = useState(initialBrands);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setEditingBrand(null);
    setDialogOpen(true);
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setDialogOpen(true);
  };

  const handleDelete = (key) => {
    setBrands((prev) => prev.filter((b) => b.key !== key));
    setMessage("Brand deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingBrand) {
        setBrands((prev) => prev.map((b) => (b.key === editingBrand.key ? { ...b, ...values } : b)));
        setMessage("Brand updated successfully");
      } else {
        setBrands((prev) => [
          ...prev,
          { ...values, key: Date.now().toString() },
        ]);
        setMessage("Brand added successfully");
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
              Brands
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Brand
            </Button>
          </Box>
          <BrandTable data={brands} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
        </CardContent>
      </Card>
      
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingBrand ? "Edit Brand" : "Add Brand"}
        </DialogTitle>
        <DialogContent>
          <BrandForm
            initialValues={editingBrand || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BrandsPage;
