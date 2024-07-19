// controllers/authController.js
const jwt = require('jsonwebtoken');

const checkAuth = (req, res) => {
    // Retrieve the token from the HttpOnly cookie
    const token = req.cookies.token; // Adjust 'token' to your cookie name if different

    // Check if the token is present
    if (!token) {
        return res.status(401).json({ isAuthenticated: false, message: 'No token provided' });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err); // Log error for debugging
            return res.status(401).json({ isAuthenticated: false, message: 'Invalid token' });
        }
        
        // If token is valid, user is authenticated
        return res.status(200).json({ isAuthenticated: true, admin: decoded.admin });
    });
};

module.exports = {
    checkAuth
};
