const cors = require('cors');
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./config/db');
const studentRoutes = require('./routes/students');
const adminRoutes = require('./routes/admin');
const Admin = require('./models/Admin'); // Import Admin model
const Student = require('./models/Student'); // Import Student model
const path = require('path');

const authRoutes = require('./routes/auth'); // Import auth routes
const cookieParser = require('cookie-parser');



dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Enable CORS for requests from localhost:3000
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, // Allow sending cookies
}));

app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Sync Sequelize models and start server
sequelize.sync().then(() => {
  console.log('All models were synchronized successfully.');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  // API routes
  app.use('/api/auth', authRoutes); // Mount auth routes

  app.use('/api/students', studentRoutes);
  app.use('/api/admin', adminRoutes);
}).catch((error) => {
  console.error('Error syncing models:', error);
});
