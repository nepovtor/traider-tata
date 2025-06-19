const express = require('express');
const { getUser } = require('../controllers/userController');
const { auth, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/user', auth, getUser);

module.exports = router;
