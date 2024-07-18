const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Student = sequelize.define('Student', {
  rollNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  section: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  qualified: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},{
  tableName: 'students', // Specify table name if different
  timestamps: false,    // Disable createdAt and updatedAt fields if not needed
});

module.exports = Student;
