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
  Typography,
  Avatar,
  CircularProgress,
  Alert,
} from '@mui/material';
import api from '../services/api';
import { format } from 'date-fns';

function Matches() {
  const [matches, setMatches] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [matchesData, usersData] = await Promise.all([
        api.getAllMatches(),
        api.getAllUsers(),
      ]);
      setMatches(matchesData);
      setUsers(usersData);
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

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  const getUserPhoto = (userId) => {
    const user = users.find(u => u.id === userId);
    return user?.photo || 'https://via.placeholder.com/40';
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
        Matches
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
                <TableCell>Match ID</TableCell>
                <TableCell>User 1</TableCell>
                <TableCell>User 2</TableCell>
                <TableCell>Matched On</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {matches
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((match) => (
                  <TableRow key={match.id} hover>
                    <TableCell>{match.id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={getUserPhoto(match.user1Id)}
                          sx={{ width: 32, height: 32 }}
                        />
                        {getUserName(match.user1Id)}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={getUserPhoto(match.user2Id)}
                          sx={{ width: 32, height: 32 }}
                        />
                        {getUserName(match.user2Id)}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {format(new Date(match.createdAt), 'MMM dd, yyyy HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={matches.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default Matches;
