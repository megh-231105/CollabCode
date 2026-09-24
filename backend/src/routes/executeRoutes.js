const express = require('express');
const router = express.Router();
const { executeCode } = require('../controllers/executeController');

// POST /api/execute - Execute code in sandbox with compilation & error checking
router.post('/', executeCode);

module.exports = router;
