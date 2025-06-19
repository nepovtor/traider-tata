const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../services/db');
const dotenv = require('dotenv');

dotenv.config();

async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT id FROM users WHERE email=?', [email]);
    if (rows.length) return res.status(400).json({ message: 'User exists' });
    const hash = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)', [name, email, hash, 'user']);
    res.json({ message: 'Registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
    if (!rows.length) return res.status(400).json({ message: 'Invalid credentials' });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: false });
    res.json({ message: 'Logged in' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
}

module.exports = { register, login, logout };
