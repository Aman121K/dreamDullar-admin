import React, { useState, useEffect } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography } from "@mui/material";
import ColorForm from "../components/Colors/ColorForm";
import ColorTable from "../components/Colors/ColorTable";
import { api } from "../utils/api";

const ColorsPage = () => {
  const [colors, setColors] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch colors from backend on component mount
  useEffect(() => {
    fetchColors();
  }, []);

  const fetchColors = async () => {
    try {
      setFetchLoading(true);
      setError("");
      const data = await api.colors.getAll();
      setColors(data);
    } catch (error) {
      console.error("Error fetching colors:", error);
      setError("Failed to load colors. Please try again.");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingColor(null);
    setDialogOpen(true);
  };

  const handleEdit = (color) => {
    setEditingColor(color);
    setDialogOpen(true);
  };

  const handleView = (color) => {
    // You can implement a view dialog here if needed
    console.log("View color:", color);
  };

  const handleDelete = async (colorId) => {
    try {
      setLoading(true);
      await api.colors.delete(colorId);
      // Remove the deleted color from the local state
      setColors((prev) => prev.filter((c) => c._id !== colorId));
      setMessage("Color deleted successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting color:", error);
      setError("Failed to delete color. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      setError("");
      
      if (editingColor) {
        // Update existing color
        const updatedColor = await api.colors.update(editingColor._id, values);
        // Update the color in local state
        setColors((prev) => prev.map((c) => (c._id === editingColor._id ? updatedColor : c)));
        setMessage("Color updated successfully");
      } else {
        // Create new color
        const newColor = await api.colors.create(values);
        // Add the new color to local state
        setColors((prev) => [...prev, newColor]);
        setMessage("Color added successfully");
      }
      
      setDialogOpen(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Error saving color:", error);
      setError(error.message || "Failed to save color. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchColors();
  };

  return (
    <Box>
      {/* Success Message */}
      {message && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setMessage("")}>
          {message}
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
                Colors Management
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Manage product colors and their hex codes
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                onClick={handleRefresh}
                disabled={fetchLoading}
              >
                Refresh
              </Button>
              <Button 
                variant="contained" 
                onClick={handleAdd}
                sx={{
                  background: 'linear-gradient(135deg, #3f51b5 0%, #5a55ae 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #303f9f 0%, #4a47a8 100%)',
                  }
                }}
              >
                Add Color
              </Button>
            </Box>
          </Box>

          {/* Color Table */}
          <ColorTable
            data={colors}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            loading={fetchLoading}
          />
        </CardContent>
      </Card>

      {/* Add/Edit Color Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 4
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderBottom: '1px solid #e0e0e0'
        }}>
          {editingColor ? "Edit Color" : "Add New Color"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <ColorForm
            initialValues={editingColor || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ColorsPage;
