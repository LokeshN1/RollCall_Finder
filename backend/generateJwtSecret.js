// generateJwtSecret.js --> it genrate a JWT Secret Key
const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(32).toString('hex'); // Generates a 256-bit key
console.log(jwtSecret);
