const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ userId: user._id }, 'Ihr_Secret_Key', { expiresIn: '1h' });
};

module.exports = { generateToken };
