const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // or 'postgres' for PostgreSQL
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('SQL database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = { sequelize, connectDB };
