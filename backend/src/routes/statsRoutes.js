const express = require('express');
const { getStats, updateStats } = require('../controllers/statsController');
const { auth } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/stats', auth, getStats);
router.post('/stats', auth, updateStats);

module.exports = router;
