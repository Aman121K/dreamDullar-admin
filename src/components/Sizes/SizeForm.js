import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const SizeForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    description: initialValues.description || ""
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
        label="Size Name"
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
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? "Saving..." : "Save Size"}
      </Button>
    </Box>
  );
};

export default SizeForm;
