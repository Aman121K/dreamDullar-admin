import React, { useState } from "react";
import { Card, CardContent, Button, Dialog, DialogTitle, DialogContent, Alert, Box, Typography, Chip } from "@mui/material";
import BannerForm from "../components/Banners/BannerForm";

const initialBanners = [
  {
    key: "1",
    title: "Summer Collection 2024",
    subtitle: "Up to 50% Off",
    description: "Discover the latest trends in nightwear and corsets",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/products/summer-collection",
    buttonText: "Shop Now",
    position: "top",
    status: true,
    startDate: "2024-06-01",
    endDate: "2024-08-31"
  },
  {
    key: "2",
    title: "Kids Night Suits",
    subtitle: "New Arrivals",
    description: "Comfortable and stylish nightwear for children",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
    linkUrl: "/products/kids-collection",
    buttonText: "Explore",
    position: "middle",
    status: true,
    startDate: "2024-05-15",
    endDate: "2024-12-31"
  }
];

const BannersPage = () => {
  const [banners, setBanners] = useState(initialBanners);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAdd = () => {
    setEditingBanner(null);
    setDialogOpen(true);
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setDialogOpen(true);
  };

  const handleDelete = (key) => {
    setBanners((prev) => prev.filter((b) => b.key !== key));
    setMessage("Banner deleted successfully");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingBanner) {
        setBanners((prev) => prev.map((b) => (b.key === editingBanner.key ? { ...b, ...values } : b)));
        setMessage("Banner updated successfully");
      } else {
        setBanners((prev) => [
          ...prev,
          { ...values, key: Date.now().toString() },
        ]);
        setMessage("Banner added successfully");
      }
      setLoading(false);
      setDialogOpen(false);
      setTimeout(() => setMessage(""), 3000);
    }, 700);
  };

  const getPositionColor = (position) => {
    switch (position) {
      case 'top': return 'primary';
      case 'middle': return 'secondary';
      case 'bottom': return 'success';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
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
              Banners
            </Typography>
            <Button variant="contained" onClick={handleAdd}>
              Add Banner
            </Button>
          </Box>
          <Box>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Image</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Title</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Subtitle</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Position</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Status</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee' }}>Dates</th>
                  <th style={{ padding: 8, borderBottom: '1px solid #eee', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((row) => (
                  <tr key={row.key}>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      {row.image ? (
                        <img 
                          src={row.image} 
                          alt="banner" 
                          style={{ 
                            width: 120, 
                            height: 60, 
                            borderRadius: 8, 
                            objectFit: 'cover' 
                          }} 
                        />
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Typography variant="body2" fontWeight="bold">
                        {row.title}
                      </Typography>
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      {row.subtitle}
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Chip 
                        label={row.position} 
                        color={getPositionColor(row.position)}
                        size="small"
                      />
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Chip 
                        label={row.status ? 'Active' : 'Inactive'} 
                        color={row.status ? 'success' : 'error'}
                        size="small"
                      />
                    </td>
                    <td style={{ padding: 8, borderBottom: '1px solid #eee' }}>
                      <Typography variant="caption" display="block">
                        {formatDate(row.startDate)} - {formatDate(row.endDate)}
                      </Typography>
                    </td>
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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingBanner ? "Edit Banner" : "Add Banner"}
        </DialogTitle>
        <DialogContent>
          <BannerForm
            initialValues={editingBanner || {}}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BannersPage;
