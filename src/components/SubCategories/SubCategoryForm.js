import React, { useState } from "react";
import { TextField, Button, Box, Typography, Avatar, MenuItem } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

// Mock categories for the select
const mockCategories = [
  { key: "1", name: "Night Suits" },
  { key: "2", name: "Corsets" },
];

const SubCategoryForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    category: initialValues.category || "",
    image: initialValues.image || ""
  });
  const [imageUrl, setImageUrl] = useState(initialValues.image || null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ ...formData, image: imageUrl });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Subcategory Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={3}
        margin="normal"
      />
      <TextField
        select
        fullWidth
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        margin="normal"
      >
        {mockCategories.map((cat) => (
          <MenuItem key={cat.key} value={cat.key}>{cat.name}</MenuItem>
        ))}
      </TextField>
      <Box sx={{ mt: 2, mb: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="subcategory-image-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="subcategory-image-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUpload />}
          >
            Upload Image
          </Button>
        </label>
        {imageUrl && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={imageUrl}
              sx={{ width: 60, height: 60, mr: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              Image uploaded
            </Typography>
          </Box>
        )}
      </Box>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Saving..." : "Save Subcategory"}
      </Button>
    </Box>
  );
};

export default SubCategoryForm;
