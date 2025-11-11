import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  CircularProgress,
  Alert,
  Avatar,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import api from '../services/api';
import { format } from 'date-fns';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [messagesData, usersData] = await Promise.all([
        api.getAllMessages(),
        api.getAllUsers(),
      ]);

      setMessages(messagesData);
      setUsers(usersData);

      // Group messages by conversation
      const convMap = new Map();
      messagesData.forEach(msg => {
        const key = [msg.senderId, msg.recipientId].sort().join('-');
        if (!convMap.has(key)) {
          convMap.set(key, {
            user1Id: Math.min(msg.senderId, msg.recipientId),
            user2Id: Math.max(msg.senderId, msg.recipientId),
            lastMessage: msg,
            count: 0,
          });
        }
        convMap.get(key).count++;
        if (new Date(msg.createdAt) > new Date(convMap.get(key).lastMessage.createdAt)) {
          convMap.get(key).lastMessage = msg;
        }
      });

      setConversations(Array.from(convMap.values()));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectConversation = async (conv) => {
    setSelectedConversation(conv);
    try {
      const msgs = await api.getConversation(conv.user1Id, conv.user2Id);
      setConversationMessages(msgs);
    } catch (err) {
      setError(err.message);
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  const getUserPhoto = (userId) => {
    const user = users.find(u => u.id === userId);
    return user?.photo || 'https://via.placeholder.com/40';
  };

  const filteredConversations = conversations.filter(conv => {
    const user1Name = getUserName(conv.user1Id).toLowerCase();
    const user2Name = getUserName(conv.user2Id).toLowerCase();
    const query = searchQuery.toLowerCase();
    return user1Name.includes(query) || user2Name.includes(query);
  });

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
        Messages
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={2} sx={{ mt: 2, height: 'calc(100vh - 200px)' }}>
        {/* Conversations List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', overflow: 'auto' }}>
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Divider />
            <List sx={{ p: 0 }}>
              {filteredConversations.map((conv, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    button
                    selected={selectedConversation === conv}
                    onClick={() => handleSelectConversation(conv)}
                    sx={{ py: 2 }}
                  >
                    <Avatar
                      src={getUserPhoto(conv.user1Id)}
                      sx={{ mr: 2 }}
                    />
                    <ListItemText
                      primary={`${getUserName(conv.user1Id)} ↔ ${getUserName(conv.user2Id)}`}
                      secondary={`${conv.count} messages • Last: ${format(
                        new Date(conv.lastMessage.createdAt),
                        'MMM dd, yyyy'
                      )}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Messages Display */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedConversation ? (
              <>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">
                    {getUserName(selectedConversation.user1Id)} ↔{' '}
                    {getUserName(selectedConversation.user2Id)}
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
                  {conversationMessages.map((msg) => (
                    <Box
                      key={msg.id}
                      sx={{
                        mb: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems:
                          msg.senderId === selectedConversation.user1Id
                            ? 'flex-start'
                            : 'flex-end',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Avatar
                          src={getUserPhoto(msg.senderId)}
                          sx={{ width: 24, height: 24 }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {getUserName(msg.senderId)}
                        </Typography>
                      </Box>
                      <Paper
                        sx={{
                          p: 1.5,
                          maxWidth: '70%',
                          backgroundColor:
                            msg.senderId === selectedConversation.user1Id
                              ? '#e3f2fd'
                              : '#f5f5f5',
                        }}
                      >
                        <Typography variant="body2">{msg.message}</Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {format(new Date(msg.createdAt), 'MMM dd, yyyy HH:mm')}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Typography color="text.secondary">
                  Select a conversation to view messages
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Messages;
