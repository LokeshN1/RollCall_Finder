// controllers/authController.js
const jwt = require('jsonwebtoken');

const checkAuth = (req, res) => {
    // Retrieve the token from the HttpOnly cookie
    const token = req.cookies.token; // Adjust 'token' to your cookie name if different
    // console.log("OKE"+token)
    if (!token) {
        return res.status(200).json({ isAuthenticated: false });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.status(200).json({ isAuthenticated: false });
        }
        // If token is valid, user is authenticated
        return res.status(200).json({ isAuthenticated: true, admin: decoded.admin });
    });
};

module.exports = {
    checkAuth
};
