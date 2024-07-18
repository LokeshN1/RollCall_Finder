// It creates a table Admin if it not exist and insert a row which have username and password of admin
const bcrypt = require('bcrypt');
const { sequelize } = require('./config/db');
const Admin = require('./models/Admin'); // Adjust the path if necessary
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env

const seedAdmin = async () => {
    const username = process.env.ADMIN_USERNAME; // Get from .env
    const password = process.env.ADMIN_PASSWORD; // Get from .env

    try {
        await sequelize.sync(); // Ensure the models are synced
        
        // Check if the admin user already exists
        const existingAdmin = await Admin.findOne({ where: { username } });
        
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            await Admin.create({
                username,
                password: hashedPassword,
            });
            console.log('Admin user created successfully!');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        await sequelize.close(); // Close the database connection
    }
};

seedAdmin();
