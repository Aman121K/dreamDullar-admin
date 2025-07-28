import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

const ColorForm = ({ initialValues = {}, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    hexCode: "#000000"
  });
  const [errors, setErrors] = useState({});

  // Update form data when initialValues change (for editing)
  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        hexCode: initialValues.hexCode || "#000000"
      });
    }
  }, [initialValues]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Color name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Color name must be at least 2 characters";
    }

    if (!formData.hexCode) {
      newErrors.hexCode = "Hex code is required";
    } else if (!/^#[0-9A-F]{6}$/i.test(formData.hexCode)) {
      newErrors.hexCode = "Please enter a valid hex code (e.g., #FF0000)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleColorChange = (e) => {
    const hexCode = e.target.value;
    setFormData({
      ...formData,
      hexCode: hexCode
    });
    
    // Clear hex code error when user changes color
    if (errors.hexCode) {
      setErrors({
        ...errors,
        hexCode: ""
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit && onSubmit(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {/* Color Preview */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Color Preview
        </Typography>
        <Box
          sx={{
            width: 80,
            height: 80,
            backgroundColor: formData.hexCode,
            borderRadius: 2,
            border: '3px solid #e0e0e0',
            mx: 'auto',
            boxShadow: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: formData.hexCode === '#ffffff' ? '#000' : '#fff',
              fontWeight: 600,
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {formData.name || 'Preview'}
          </Typography>
        </Box>
      </Box>

      {/* Color Name Field */}
      <TextField
        fullWidth
        label="Color Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        margin="normal"
        error={!!errors.name}
        helperText={errors.name}
        placeholder="e.g., Deep Red, Ocean Blue"
        sx={{ mb: 2 }}
      />

      {/* Color Picker and Hex Code */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Select Color
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ position: 'relative' }}>
            <input
              type="color"
              value={formData.hexCode}
              onChange={handleColorChange}
              style={{ 
                width: 60, 
                height: 50, 
                border: 'none', 
                borderRadius: 8,
                cursor: 'pointer'
              }}
            />
            <Typography 
              variant="caption" 
              sx={{ 
                position: 'absolute', 
                bottom: -20, 
                left: '50%', 
                transform: 'translateX(-50%)',
                color: 'text.secondary',
                fontSize: '0.7rem'
              }}
            >
              Pick
            </Typography>
          </Box>
          <TextField
            label="Hex Code"
            name="hexCode"
            value={formData.hexCode}
            onChange={handleChange}
            required
            error={!!errors.hexCode}
            helperText={errors.hexCode}
            placeholder="#FF0000"
            sx={{ flex: 1 }}
            inputProps={{
              style: { fontFamily: 'monospace', fontWeight: 600 }
            }}
          />
        </Box>
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{ 
          mt: 2,
          py: 1.5,
          background: 'linear-gradient(135deg, #3f51b5 0%, #5a55ae 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #303f9f 0%, #4a47a8 100%)',
          },
          '&:disabled': {
            background: '#e0e0e0'
          }
        }}
      >
        {loading ? "Saving..." : (initialValues._id ? "Update Color" : "Add Color")}
      </Button>
    </Box>
  );
};

export default ColorForm;
