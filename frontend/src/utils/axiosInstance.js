// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL:`${process.env.REACT_APP_BASE_URL}/api`, // Adjust baseURL as per your server setup
  withCredentials: true, // Important for sending cookies
});

export default instance;
