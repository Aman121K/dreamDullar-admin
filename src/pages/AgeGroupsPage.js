import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography } from "@mui/material";
import AgeGroupForm from "../components/AgeGroups/AgeGroupForm";

const initialAgeGroups = [
  { key: "1", name: "Kids (2-5)", minAge: 2, maxAge: 5, description: "Toddlers and young children" },
  { key: "2", name: "Children (6-12)", minAge: 6, maxAge: 12, description: "School age children" },
  { key: "3", name: "Teens (13-17)", minAge: 13, maxAge: 17, description: "Teenagers" },
  { key: "4", name: "Adults (18+)", minAge: 18, maxAge: 100, description: "Adults" },
];

const AgeGroupsPage = () => {
  const [ageGroups, setAgeGroups] = useState(initialAgeGroups);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAgeGroup, setEditingAgeGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setEditingAgeGroup(null);
    setDialogOpen(true);
  };

  const handleEdit = (ageGroup) => {
    setEditingAgeGroup(ageGroup);
    setDialogOpen(true);
  };

  const handleDelete = (key) => {
    setAgeGroups((prev) => prev.filter((ag) => ag.key !== key));
    setMessage("Age Group deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingAgeGroup) {
        setAgeGroups((prev) => prev.map((ag) => (ag.key === editingAgeGroup.key ? { ...ag, ...values } : ag)));
        setMessage("Age Group updated successfully");
      } else {
        setAgeGroups((prev) => [
          ...prev,
          { ...values, key: Date.now().toString() },
        ]);
        setMessage("Age Group added successfully");
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
              Age Groups
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Age Group
            </Button>
          </Box>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Age Group Name</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Age Range</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Description</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ageGroups.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.name}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.minAge} - {row.maxAge}</td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>{row.description}</td>
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
          {editingAgeGroup ? "Edit Age Group" : "Add Age Group"}
        </DialogTitle>
        <DialogContent>
          <AgeGroupForm
            initialValues={editingAgeGroup || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AgeGroupsPage;
