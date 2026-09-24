const express = require('express');
const router = express.Router();

// @route   GET /api/health
// @desc    Basic health check
// @access  Public
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'CollabCode backend is running',
  });
});

module.exports = router;
