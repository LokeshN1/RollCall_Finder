const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures usernames are unique
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Admins', // Specify table name if different
  timestamps: false,    // Disable createdAt and updatedAt fields if not needed
});

module.exports = Admin;
