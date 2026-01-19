const API_BASE_URL = 'http://localhost:5001/api';

// Store token in localStorage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Store user data in localStorage
const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data from localStorage
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Remove user data from localStorage
const removeUser = () => {
  localStorage.removeItem('user');
};

// Register user
const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (data.success) {
      // Store token and user data
      setToken(data.data.accessToken);
      setUser(data.data.user);
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
};

// Login user
const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (data.success) {
      // Store token and user data
      setToken(data.data.accessToken);
      setUser(data.data.user);
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
};

// Logout user
const logout = async () => {
  try {
    const token = getToken();
    if (token) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    }
    
    // Clear local storage
    removeToken();
    removeUser();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    // Even if API call fails, clear local storage
    removeToken();
    removeUser();
    return { success: true };
  }
};

// Get current user profile
const getCurrentUser = async () => {
  try {
    const token = getToken();
    if (!token) {
      return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (data.success) {
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error('Get current user error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
};

// Update user profile
const updateProfile = async (profileData) => {
  try {
    const token = getToken();
    if (!token) {
      return { success: false, error: 'No token found' };
    }

    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (data.success) {
      // Update user data in localStorage
      setUser(data.data.user);
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message };
    }
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: 'Network error. Please try again.' };
  }
};

// Check if user is authenticated
const isAuthenticated = () => {
  const token = getToken();
  const user = getUser();
  return !!(token && user);
};

// Get user role
const getUserRole = () => {
  const user = getUser();
  return user ? user.role : null;
};

export {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  removeUser,
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  isAuthenticated,
  getUserRole,
};
