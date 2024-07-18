// routes/auth.js
const express = require('express');
const { checkAuth } = require('../controllers/authController');

const router = express.Router();

// Route to check authentication
router.get('/check-auth', checkAuth);

module.exports = router;
