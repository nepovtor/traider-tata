const pool = require('../services/db');

async function getUser(req, res) {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role FROM users WHERE id=?', [req.user.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getUser };
