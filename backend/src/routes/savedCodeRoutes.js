const express = require('express');
const router = express.Router();
const {
  getSavedCodes,
  saveCodeSnippet,
  deleteSavedCode,
} = require('../controllers/savedCodeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(protect, getSavedCodes)
  .post(protect, saveCodeSnippet);

router.route('/:id')
  .delete(protect, deleteSavedCode);

module.exports = router;
