const express = require('express');
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById,
  joinRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

// Public or protected room access
router.route('/')
  .post(protect, createRoom)
  .get(getAllRooms);

router.route('/:roomId')
  .get(protect, getRoomById)
  .put(protect, updateRoom)
  .delete(protect, deleteRoom);

router.post('/:roomId/join', protect, joinRoom);

module.exports = router;
