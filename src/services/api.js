// API service for CMS backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://datingapp.m17h4n.workers.dev/api';

class AdminApiService {
  // Admin login
  async adminLogin(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Admin login error:', error);
      throw error;
    }
  }

  // Get all users
  async getAllUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`);

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return await response.json();
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  }

  // Get user details
  async getUserDetails(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user details error:', error);
      throw error;
    }
  }

  // Update user
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update user');
      }

      return await response.json();
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  // Block/Unblock user
  async blockUser(userId, blocked) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/block`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blocked }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update user status');
      }

      return await response.json();
    } catch (error) {
      console.error('Block user error:', error);
      throw error;
    }
  }

  // Delete user
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete user');
      }

      return await response.json();
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }

  // Get analytics stats
  async getAnalytics() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/analytics`);

      if (!response.ok) {
        throw new Error('Failed to fetch analytics');
      }

      return await response.json();
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }

  // Get all matches
  async getAllMatches() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/matches`);

      if (!response.ok) {
        throw new Error('Failed to fetch matches');
      }

      return await response.json();
    } catch (error) {
      console.error('Get matches error:', error);
      throw error;
    }
  }

  // Get all messages
  async getAllMessages() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/messages`);

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      return await response.json();
    } catch (error) {
      console.error('Get messages error:', error);
      throw error;
    }
  }

  // Get conversation between two users
  async getConversation(userId1, userId2) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/messages/${userId1}/${userId2}`);

      if (!response.ok) {
        throw new Error('Failed to fetch conversation');
      }

      return await response.json();
    } catch (error) {
      console.error('Get conversation error:', error);
      throw error;
    }
  }

  // Get all reports
  async getReports() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/reports`);

      if (!response.ok) {
        throw new Error('Failed to fetch reports');
      }

      return await response.json();
    } catch (error) {
      console.error('Get reports error:', error);
      throw error;
    }
  }

  // Update report status
  async updateReport(reportId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/reports/${reportId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update report');
      }

      return await response.json();
    } catch (error) {
      console.error('Update report error:', error);
      throw error;
    }
  }

  // Get all swipes
  async getAllSwipes() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/swipes`);

      if (!response.ok) {
        throw new Error('Failed to fetch swipes');
      }

      return await response.json();
    } catch (error) {
      console.error('Get swipes error:', error);
      throw error;
    }
  }
}

export default new AdminApiService();
