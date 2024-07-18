import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminLogin.css';
import AuthContext from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/admin/login`, { username, password }, { withCredentials: true });
      if (response.data.success) {
        setIsAuthenticated(true);
        navigate('/students');
      } else {
        setErrors({ general: 'Invalid credentials' });
      }
    } catch (error) {
      setErrors({ general: 'Failed to login' });
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 id='text1'>Login as Admin</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, username: '' }));
          }}
        />
        {errors.username && <p className="error-message">{errors.username}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
          }}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        <button onClick={handleLogin}>Login</button>
        {errors.general && <p className="error-message">{errors.general}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
