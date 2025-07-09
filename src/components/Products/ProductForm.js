import React, { useState } from "react";
import {
  TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Switch, FormControlLabel, Chip, OutlinedInput, Avatar, Grid, IconButton
} from "@mui/material";
import { CloudUpload, Delete, Star } from "@mui/icons-material";

// Mock data for selects
const mockCategories = [
  { key: "1", name: "Night Suits" },
  { key: "2", name: "Corsets" },
];
const mockSubCategories = {
  "1": [
    { key: "1-1", name: "Cotton Night Suits" },
    { key: "1-2", name: "Silk Night Suits" },
  ],
  "2": [
    { key: "2-1", name: "Lace Corsets" },
    { key: "2-2", name: "Shapewear Corsets" },
  ],
};
const mockBrands = [
  { key: "b1", name: "DreamWear" },
  { key: "b2", name: "NightQueen" },
];
const mockSizes = ["S", "M", "L", "XL", "XXL"];
const mockColors = [
  { key: "#000000", name: "Black" },
  { key: "#ffffff", name: "White" },
  { key: "#e91e63", name: "Pink" },
  { key: "#3f51b5", name: "Blue" },
];
const mockAgeGroups = ["2-5", "6-10", "11-15", "16-20", "21+"];
const mockBadges = ["New", "Trending", "Best Seller", "Limited Edition"];

const ProductForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    category: initialValues.category || "",
    subCategory: initialValues.subCategory || "",
    brand: initialValues.brand || "",
    price: initialValues.price || "",
    discountPrice: initialValues.discountPrice || "",
    sizes: initialValues.sizes || [],
    colors: initialValues.colors || [],
    ageGroups: initialValues.ageGroups || [],
    stock: initialValues.stock || "",
    sku: initialValues.sku || "",
    images: initialValues.images || [],
    status: initialValues.status !== undefined ? initialValues.status : true,
    tags: initialValues.tags || [],
    featured: initialValues.featured || false,
    badges: initialValues.badges || [],
  });
  const [imagePreviews, setImagePreviews] = useState(initialValues.images || []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMultiChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSwitchChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
      subCategory: ""
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...previews]);
    setFormData({
      ...formData,
      images: [...formData.images, ...files],
    });
  };

  const handleImageDelete = (idx) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== idx));
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            margin="normal"
            placeholder="e.g., Cotton Night Suit for Women"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
            placeholder="Product details, fabric, care instructions, etc."
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              label="Category"
              required
            >
              {mockCategories.map((cat) => (
                <MenuItem key={cat.key} value={cat.key}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" disabled={!formData.category}>
            <InputLabel>SubCategory</InputLabel>
            <Select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              label="SubCategory"
              required
            >
              {(mockSubCategories[formData.category] || []).map((sub) => (
                <MenuItem key={sub.key} value={sub.key}>{sub.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Brand</InputLabel>
            <Select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              label="Brand"
              required
            >
              {mockBrands.map((brand) => (
                <MenuItem key={brand.key} value={brand.key}>{brand.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price (₹)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                margin="normal"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Discount Price (₹)"
                name="discountPrice"
                type="number"
                value={formData.discountPrice}
                onChange={handleChange}
                margin="normal"
                inputProps={{ min: 0 }}
              />
            </Grid>
          </Grid>
          <FormControl fullWidth margin="normal">
            <InputLabel>Sizes</InputLabel>
            <Select
              multiple
              name="sizes"
              value={formData.sizes}
              onChange={handleMultiChange}
              input={<OutlinedInput label="Sizes" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {mockSizes.map((size) => (
                <MenuItem key={size} value={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Colors</InputLabel>
            <Select
              multiple
              name="colors"
              value={formData.colors}
              onChange={handleMultiChange}
              input={<OutlinedInput label="Colors" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => {
                    const colorObj = mockColors.find(c => c.key === value);
                    return (
                      <Chip
                        key={value}
                        label={colorObj?.name || value}
                        avatar={<Avatar sx={{ bgcolor: value, width: 20, height: 20 }} />}
                        size="small"
                      />
                    );
                  })}
                </Box>
              )}
            >
              {mockColors.map((color) => (
                <MenuItem key={color.key} value={color.key}>
                  <Box sx={{ display: 'inline-block', width: 16, height: 16, bgcolor: color.key, borderRadius: '50%', mr: 1, border: '1px solid #ccc' }} />
                  {color.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Age Groups</InputLabel>
            <Select
              multiple
              name="ageGroups"
              value={formData.ageGroups}
              onChange={handleMultiChange}
              input={<OutlinedInput label="Age Groups" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {mockAgeGroups.map((age) => (
                <MenuItem key={age} value={age}>{age}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock Quantity"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                margin="normal"
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="SKU / Barcode"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                margin="normal"
                placeholder="e.g., SKU12345"
              />
            </Grid>
          </Grid>
          <TextField
            fullWidth
            label="Tags (comma separated)"
            name="tags"
            value={formData.tags}
            onChange={e => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) })}
            margin="normal"
            placeholder="e.g., summer, cotton, trending"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Badges</InputLabel>
            <Select
              multiple
              name="badges"
              value={formData.badges}
              onChange={handleMultiChange}
              input={<OutlinedInput label="Badges" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} icon={<Star fontSize="small" />} size="small" />
                  ))}
                </Box>
              )}
            >
              {mockBadges.map((badge) => (
                <MenuItem key={badge} value={badge}>{badge}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ mt: 2, mb: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.status}
                  onChange={handleSwitchChange}
                  name="status"
                />
              }
              label="Active Product"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.featured}
                  onChange={handleSwitchChange}
                  name="featured"
                />
              }
              label="Featured"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Product Images
          </Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<CloudUpload />}
            fullWidth
            sx={{ mb: 2 }}
          >
            Upload Images
            <input
              accept="image/*"
              type="file"
              multiple
              hidden
              onChange={handleImageUpload}
            />
          </Button>
          <Grid container spacing={1}>
            {imagePreviews.map((img, idx) => (
              <Grid item key={idx}>
                <Box sx={{ position: 'relative', width: 80, height: 80 }}>
                  <Avatar
                    src={img}
                    variant="rounded"
                    sx={{ width: 80, height: 80, boxShadow: 2, borderRadius: 2 }}
                  />
                  <IconButton
                    size="small"
                    sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'rgba(255,255,255,0.7)' }}
                    onClick={() => handleImageDelete(idx)}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 3 }}
      >
        {loading ? "Saving..." : "Save Product"}
      </Button>
    </Box>
  );
};

export default ProductForm;
