import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Box,
  Tooltip,
  TablePagination
} from "@mui/material";
import { Edit, Delete, Visibility, Star } from "@mui/icons-material";

const ProductTable = ({ data, onEdit, onDelete, onView, loading }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(itemToDelete.key);
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatPrice = (price) => {
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  const getStatusColor = (status) => {
    return status ? 'success' : 'error';
  };

  const getStatusText = (status) => {
    return status ? 'Active' : 'Inactive';
  };

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          '& .MuiTable-root': {
            borderCollapse: 'separate',
            borderSpacing: 0,
          }
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Image</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Product Name</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Brand</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Price</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Stock</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }} align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
              <TableRow 
                key={row.key}
                sx={{ 
                  '&:hover': { backgroundColor: '#f8f9fa' },
                  '&:nth-of-type(odd)': { backgroundColor: '#fafafa' }
                }}
              >
                <TableCell>
                  <Avatar 
                    src={row.images?.[0]} 
                    sx={{ width: 50, height: 50, borderRadius: 1 }}
                    variant="rounded"
                  >
                    {row.name?.charAt(0)}
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                      {row.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      SKU: {row.sku}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.category} 
                    size="small" 
                    sx={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.brand}</Typography>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#333' }}>
                      {formatPrice(row.price)}
                    </Typography>
                    {row.discountPrice && (
                      <Typography variant="caption" color="error" sx={{ textDecoration: 'line-through' }}>
                        {formatPrice(row.discountPrice)}
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.stock} 
                    size="small" 
                    color={row.stock > 10 ? 'success' : row.stock > 0 ? 'warning' : 'error'}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={getStatusText(row.status)} 
                    size="small" 
                    color={getStatusColor(row.status)}
                  />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                    <Tooltip title="View Details">
                      <IconButton
                        color="primary"
                        onClick={() => onView(row)}
                        size="small"
                        sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
                      >
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Product">
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(row)}
                        size="small"
                        sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(row)}
                        size="small"
                        sx={{ '&:hover': { backgroundColor: '#ffebee' } }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: '#f5f5f5',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '0.875rem',
              fontWeight: 500
            }
          }}
        />
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{itemToDelete?.name}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductTable;
