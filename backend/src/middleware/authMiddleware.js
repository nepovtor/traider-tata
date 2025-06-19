const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

function admin(req, res, next) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Forbidden' });
}

module.exports = { auth, admin };
