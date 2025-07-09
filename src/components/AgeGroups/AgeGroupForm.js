import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const AgeGroupForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || "",
    minAge: initialValues.minAge || "",
    maxAge: initialValues.maxAge || "",
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
        label="Age Group Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Min Age"
        name="minAge"
        type="number"
        value={formData.minAge}
        onChange={handleChange}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Max Age"
        name="maxAge"
        type="number"
        value={formData.maxAge}
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
        {loading ? "Saving..." : "Save Age Group"}
      </Button>
    </Box>
  );
};

export default AgeGroupForm; 