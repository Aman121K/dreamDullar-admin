import React, { useState } from "react";
import { TextField, Button, Box, Typography, Avatar } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

const BrandForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    logo: initialValues.logo || ""
  });
  const [imageUrl, setImageUrl] = useState(initialValues.logo || null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({ ...formData, logo: imageUrl });
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
        label="Brand Name"
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
      
      <Box sx={{ mt: 2, mb: 2 }}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="logo-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="logo-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUpload />}
          >
            Upload Logo
          </Button>
        </label>
        
        {imageUrl && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={imageUrl}
              sx={{ width: 60, height: 60, mr: 2 }}
            />
            <Typography variant="body2" color="text.secondary">
              Logo uploaded
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
        {loading ? "Saving..." : "Save Brand"}
      </Button>
    </Box>
  );
};

export default BrandForm; 