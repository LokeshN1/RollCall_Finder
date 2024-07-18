// routes/admin.js

const express = require('express');
const { adminLogin, adminLogout } = require('../controllers/adminController');
const router = express.Router();

// Admin login route
router.post('/login', adminLogin);

// Admin logout route
router.get('/logout', adminLogout);

module.exports = router;
