import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const ColorForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    hexCode: initialValues.hexCode || "#000000"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
        label="Color Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Color
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <input
            type="color"
            value={formData.hexCode}
            onChange={(e) => setFormData({ ...formData, hexCode: e.target.value })}
            style={{ width: 50, height: 40, border: 'none', borderRadius: 4 }}
          />
          <TextField
            label="Hex Code"
            name="hexCode"
            value={formData.hexCode}
            onChange={handleChange}
            required
            sx={{ flex: 1 }}
          />
        </Box>
      </Box>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Saving..." : "Save Color"}
      </Button>
    </Box>
  );
};

export default ColorForm;
