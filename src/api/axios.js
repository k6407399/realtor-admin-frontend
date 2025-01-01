import axios from 'axios';

// Use the REACT_APP_BACKEND_URL from .env
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL, // Dynamically set base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

/* import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api/v1/admin', // Update this if your backend base URL changes
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
 */