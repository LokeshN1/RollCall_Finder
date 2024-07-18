import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Navbar.css';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/logout`, { withCredentials: true });
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo-link">RollCall Finder</Link>
        <span className="subheading">Search and Access Your Details by Roll-Number</span>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/students" className="nav-link">Student List</Link>
        </li>
        {isAuthenticated ? (
          <li className="nav-item">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login" className="nav-link">Admin Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
