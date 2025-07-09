import React, { useState } from "react";
import { TextField, Button, Box, Typography, Avatar, MenuItem, FormControl, InputLabel, Select, Switch, FormControlLabel } from "@mui/material";
import { CloudUpload, CalendarToday } from "@mui/icons-material";

const BannerForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: initialValues.title || "",
    subtitle: initialValues.subtitle || "",
    description: initialValues.description || "",
    image: initialValues.image || "",
    linkUrl: initialValues.linkUrl || "",
    buttonText: initialValues.buttonText || "Shop Now",
    position: initialValues.position || "top",
    status: initialValues.status !== undefined ? initialValues.status : true,
    startDate: initialValues.startDate || "",
    endDate: initialValues.endDate || ""
  });
  const [imageUrl, setImageUrl] = useState(initialValues.image || null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSwitchChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
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
        label="Banner Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        margin="normal"
        placeholder="e.g., Summer Collection 2024"
      />
      
      <TextField
        fullWidth
        label="Subtitle"
        name="subtitle"
        value={formData.subtitle}
        onChange={handleChange}
        margin="normal"
        placeholder="e.g., Up to 50% Off"
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
        placeholder="e.g., Discover the latest trends in nightwear and corsets"
      />
      
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Banner Image (Recommended: 1920x600px)
        </Typography>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="banner-image-upload"
          type="file"
          onChange={handleImageUpload}
        />
        <label htmlFor="banner-image-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUpload />}
            fullWidth
          >
            Upload Banner Image
          </Button>
        </label>
        {imageUrl && (
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={imageUrl}
              sx={{ width: 120, height: 60, mr: 2 }}
              variant="rounded"
            />
            <Typography variant="body2" color="text.secondary">
              Image uploaded
            </Typography>
          </Box>
        )}
      </Box>
      
      <TextField
        fullWidth
        label="Link URL"
        name="linkUrl"
        value={formData.linkUrl}
        onChange={handleChange}
        margin="normal"
        placeholder="e.g., /products/summer-collection"
      />
      
      <TextField
        fullWidth
        label="Button Text"
        name="buttonText"
        value={formData.buttonText}
        onChange={handleChange}
        margin="normal"
        placeholder="e.g., Shop Now"
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Position</InputLabel>
        <Select
          name="position"
          value={formData.position}
          onChange={handleChange}
          label="Position"
        >
          <MenuItem value="top">Top Banner</MenuItem>
          <MenuItem value="middle">Middle Banner</MenuItem>
          <MenuItem value="bottom">Bottom Banner</MenuItem>
        </Select>
      </FormControl>
      
      <Box sx={{ mt: 2, mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.status}
              onChange={handleSwitchChange}
              name="status"
            />
          }
          label="Active Banner"
        />
      </Box>
      
      <TextField
        fullWidth
        label="Start Date"
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      
      <TextField
        fullWidth
        label="End Date"
        name="endDate"
        type="date"
        value={formData.endDate}
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
        {loading ? "Saving..." : "Save Banner"}
      </Button>
    </Box>
  );
};

export default BannerForm;
