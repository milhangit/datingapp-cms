import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Edit,
  Delete,
  Block,
  CheckCircle,
  Visibility,
} from '@mui/icons-material';
import api from '../services/api';
import { format } from 'date-fns';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleBlockUser = async (userId, currentStatus) => {
    try {
      await api.blockUser(userId, !currentStatus);
      await fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.deleteUser(userId);
        await fetchUsers();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>
                      {user.blocked ? (
                        <Chip label="Blocked" color="error" size="small" />
                      ) : (
                        <Chip label="Active" color="success" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleViewUser(user)}
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton
                        size="small"
                        color={user.blocked ? 'success' : 'warning'}
                        onClick={() => handleBlockUser(user.id, user.blocked)}
                      >
                        {user.blocked ? <CheckCircle /> : <Block />}
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* User Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <img
                src={selectedUser.photo || 'https://via.placeholder.com/150'}
                alt={selectedUser.name}
                style={{ width: 150, height: 150, borderRadius: '50%', marginBottom: 20 }}
              />
              <Typography variant="body1"><strong>Name:</strong> {selectedUser.name}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {selectedUser.email}</Typography>
              <Typography variant="body1"><strong>Gender:</strong> {selectedUser.gender}</Typography>
              <Typography variant="body1"><strong>Age:</strong> {selectedUser.age}</Typography>
              <Typography variant="body1"><strong>Religion:</strong> {selectedUser.religion}</Typography>
              <Typography variant="body1"><strong>Occupation:</strong> {selectedUser.occupation}</Typography>
              <Typography variant="body1"><strong>Education:</strong> {selectedUser.education}</Typography>
              <Typography variant="body1"><strong>City:</strong> {selectedUser.city}</Typography>
              <Typography variant="body1"><strong>Bio:</strong> {selectedUser.bio}</Typography>
              <Typography variant="body1"><strong>Interests:</strong> {
                Array.isArray(selectedUser.interests)
                  ? selectedUser.interests.join(', ')
                  : selectedUser.interests
              }</Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {selectedUser.blocked ? 'Blocked' : 'Active'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Users;
