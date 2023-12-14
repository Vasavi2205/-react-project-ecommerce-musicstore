// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};
 
const login = async (credentials) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { email: credentials.email, password: credentials.password,userRole:credentials.role },
    });
    const user = response.data[0];
    return user;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export { register, login };