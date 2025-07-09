import React, { useState } from "react";
import { TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Switch, FormControlLabel, Chip } from "@mui/material";
import { LocalOffer } from "@mui/icons-material";

// Mock categories for multi-select
const mockCategories = [
  { key: "1", name: "Night Suits" },
  { key: "2", name: "Corsets" },
  { key: "3", name: "Kids Night Suits" },
  { key: "4", name: "Lace Corsets" },
];

const DiscountForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    type: initialValues.type || "percentage",
    value: initialValues.value || "",
    minOrderAmount: initialValues.minOrderAmount || "",
    maxDiscount: initialValues.maxDiscount || "",
    applicableCategories: initialValues.applicableCategories || [],
    startDate: initialValues.startDate || "",
    endDate: initialValues.endDate || "",
    status: initialValues.status !== undefined ? initialValues.status : true,
    usageLimit: initialValues.usageLimit || "",
    description: initialValues.description || ""
  });

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

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      applicableCategories: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Discount Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
        placeholder="e.g., SUMMER20, FLASH50"
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Discount Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          label="Discount Type"
        >
          <MenuItem value="percentage">Percentage (%)</MenuItem>
          <MenuItem value="fixed">Fixed Amount ($)</MenuItem>
        </Select>
      </FormControl>
      
      <TextField
        fullWidth
        label={`Discount Value ${formData.type === 'percentage' ? '(%)' : '($)'}`}
        name="value"
        type="number"
        value={formData.value}
        onChange={handleChange}
        required
        margin="normal"
        placeholder={formData.type === 'percentage' ? "e.g., 20" : "e.g., 50"}
      />
      
      <TextField
        fullWidth
        label="Minimum Order Amount ($)"
        name="minOrderAmount"
        type="number"
        value={formData.minOrderAmount}
        onChange={handleChange}
        margin="normal"
        placeholder="e.g., 100"
      />
      
      <TextField
        fullWidth
        label="Maximum Discount Amount ($)"
        name="maxDiscount"
        type="number"
        value={formData.maxDiscount}
        onChange={handleChange}
        margin="normal"
        placeholder="e.g., 200"
      />
      
      <FormControl fullWidth margin="normal">
        <InputLabel>Applicable Categories</InputLabel>
        <Select
          multiple
          name="applicableCategories"
          value={formData.applicableCategories}
          onChange={handleCategoryChange}
          label="Applicable Categories"
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => {
                const category = mockCategories.find(cat => cat.key === value);
                return (
                  <Chip key={value} label={category?.name || value} size="small" />
                );
              })}
            </Box>
          )}
        >
          {mockCategories.map((category) => (
            <MenuItem key={category.key} value={category.key}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
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
      
      <TextField
        fullWidth
        label="Usage Limit"
        name="usageLimit"
        type="number"
        value={formData.usageLimit}
        onChange={handleChange}
        margin="normal"
        placeholder="e.g., 1000 (0 for unlimited)"
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
        placeholder="e.g., Summer collection discount for all customers"
      />
      
      <Box sx={{ mt: 2, mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={formData.status}
              onChange={handleSwitchChange}
              name="status"
            />
          }
          label="Active Discount"
        />
      </Box>
      
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 3 }}
        startIcon={<LocalOffer />}
      >
        {loading ? "Saving..." : "Save Discount"}
      </Button>
    </Box>
  );
};

export default DiscountForm;
