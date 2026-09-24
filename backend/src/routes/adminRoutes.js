const express = require('express');
const router = express.Router();
const { adminTest } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeAdmin } = require('../middleware/roleMiddleware');

// Protected admin-only routes
router.get('/test', protect, authorizeAdmin, adminTest);

module.exports = router;
