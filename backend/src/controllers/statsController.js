const pool = require('../services/db');

async function getStats(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM trading_stats WHERE user_id=?', [req.user.id]);
    if (!rows.length) return res.json({ total_trades: 0, win_rate: 0, profit: 0 });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function updateStats(req, res) {
  const { total_trades, win_rate, profit } = req.body;
  try {
    const [rows] = await pool.query('SELECT id FROM trading_stats WHERE user_id=?', [req.user.id]);
    if (rows.length) {
      await pool.query('UPDATE trading_stats SET total_trades=?, win_rate=?, profit=?, updated_at=NOW() WHERE user_id=?', [total_trades, win_rate, profit, req.user.id]);
    } else {
      await pool.query('INSERT INTO trading_stats (user_id, total_trades, win_rate, profit, updated_at) VALUES (?,?,?,?,NOW())', [req.user.id, total_trades, win_rate, profit]);
    }
    res.json({ message: 'Stats updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { getStats, updateStats };
