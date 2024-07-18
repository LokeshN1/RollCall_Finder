const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
  let { username, password } = req.body;

  console.log('Request Body:', req.body);

  try {
    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Fetch admin by username
    const sql = 'SELECT * FROM Admins WHERE username = ?';
    const results = await sequelize.query(sql, {
      replacements: [username],
      type: QueryTypes.SELECT,
    });

    if (results.length > 0) {
      const admin = results[0];   // original username and original hashed password

      // Compare hashed password with the provided password
      const match = await bcrypt.compare(password, admin.password);
      if (match) {
        // Successful authentication - generate JWT
        const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set HttpOnly cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });

        return res.status(200).json({ success: true, message: 'Login successful' });
      } else {
        // Invalid password
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
    } else {
      // Admin not found
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
  } catch (err) {
    console.error('Error during admin login:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const adminLogout = async (req, res) => {
  try {
    res.clearCookie('token'); // Clear the HttpOnly cookie
    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (err) {
    console.error('Error during admin logout:', err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  adminLogin,
  adminLogout,
};
