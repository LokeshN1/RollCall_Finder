import axios from 'axios';

// Set base URL for Axios requests
const baseURL = 'http://localhost:5000'; // Replace with your backend's URL

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`, // This will prepend '/api' to all requests
});

export default axiosInstance;
