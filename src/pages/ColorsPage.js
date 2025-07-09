import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography } from "@mui/material";
import ColorForm from "../components/Colors/ColorForm";

const initialColors = [
  { key: "1", name: "Red", hexCode: "#ff0000" },
  { key: "2", name: "Blue", hexCode: "#0000ff" },
  { key: "3", name: "Green", hexCode: "#00ff00" },
  { key: "4", name: "Black", hexCode: "#000000" },
  { key: "5", name: "White", hexCode: "#ffffff" },
];

const ColorsPage = () => {
  const [colors, setColors] = useState(initialColors);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setEditingColor(null);
    setDialogOpen(true);
  };

  const handleEdit = (color) => {
    setEditingColor(color);
    setDialogOpen(true);
  };

  const handleDelete = (key) => {
    setColors((prev) => prev.filter((c) => c.key !== key));
    setMessage("Color deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingColor) {
        setColors((prev) => prev.map((c) => (c.key === editingColor.key ? { ...c, ...values } : c)));
        setMessage("Color updated successfully");
      } else {
        setColors((prev) => [
          ...prev,
          { ...values, key: Date.now().toString() },
        ]);
        setMessage("Color added successfully");
      }
      setLoading(false);
      setDialogOpen(false);
      setTimeout(() => setMessage(""), 3000);
    }, 700);
  };

  return (
    <Box>
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" component="h2">
              Colors
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Color
            </Button>
          </Box>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Color</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Color Name</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Hex Code</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {colors.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          backgroundColor: row.hexCode,
                          borderRadius: 1,
                          border: '1px solid #ddd'
                        }}
                      />
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.name}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.hexCode}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>
                      <Button size="small" variant="outlined" sx={{ mr: 1 }} onClick={() => handleEdit(row)}>
                        Edit
                      </Button>
                      <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(row.key)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingColor ? "Edit Color" : "Add Color"}
        </DialogTitle>
        <DialogContent>
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
