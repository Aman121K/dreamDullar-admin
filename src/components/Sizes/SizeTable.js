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
import { Edit, Delete, Visibility } from "@mui/icons-material";

const SizeTable = ({ data, onEdit, onDelete, onView, loading }) => {
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
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Size Name</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#333' }}>Products Count</TableCell>
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
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip 
                      label={row.name} 
                      size="small" 
                      sx={{ 
                        backgroundColor: '#e3f2fd', 
                        color: '#1976d2',
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
                    {row.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.productsCount || 0} 
                    size="small" 
                    sx={{ backgroundColor: '#e8f5e8', color: '#2e7d32' }}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label="Active" 
                    size="small" 
                    color="success"
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
                    <Tooltip title="Edit Size">
                      <IconButton
                        color="primary"
                        onClick={() => onEdit(row)}
                        size="small"
                        sx={{ '&:hover': { backgroundColor: '#e3f2fd' } }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Size">
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
        <DialogTitle>Delete Size</DialogTitle>
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

export default SizeTable;
