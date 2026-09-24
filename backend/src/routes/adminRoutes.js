const express = require('express');
const router = express.Router();
const {
  getAdminStats,
  getAdminUsers,
  getAdminRooms,
  deleteAdminUser,
  deleteAdminRoom,
  adminTest,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { adminMiddleware } = require('../middleware/adminMiddleware');

// All admin routes are protected with JWT auth and Admin role verification
router.use(protect, adminMiddleware);

router.get('/stats', getAdminStats);
router.get('/users', getAdminUsers);
router.delete('/users/:id', deleteAdminUser);
router.get('/rooms', getAdminRooms);
router.delete('/rooms/:id', deleteAdminRoom);
router.get('/test', adminTest);

module.exports = router;
