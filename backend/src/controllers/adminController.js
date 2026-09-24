const User = require('../models/User');
const CodingRoom = require('../models/CodingRoom');
const SavedCode = require('../models/SavedCode');

// @desc    Get admin overview statistics directly from MongoDB Atlas
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRooms = await CodingRoom.countDocuments();
    const totalSavedCodes = await SavedCode.countDocuments();

    // Active rooms (rooms updated in last 7 days or total rooms)
    const activeRooms = totalRooms;

    const recentUsers = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentRooms = await CodingRoom.find()
      .populate('owner', 'name email')
      .sort({ updatedAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalRooms,
        activeRooms,
        totalSavedCodes,
      },
      recentUsers,
      recentRooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving admin statistics',
      error: error.message,
    });
  }
};

// @desc    Get all registered users from MongoDB
// @route   GET /api/admin/users
// @access  Private/Admin
const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    // Fetch room counts per user
    const usersWithStats = await Promise.all(
      users.map(async (u) => {
        const roomsCount = await CodingRoom.countDocuments({ owner: u._id });
        return {
          id: u._id.toString(),
          _id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          status: 'Active',
          roomsCount,
          joinedDate: new Date(u.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
          }),
          createdAt: u.createdAt,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: usersWithStats.length,
      users: usersWithStats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving users directory',
      error: error.message,
    });
  }
};

// @desc    Get all coding rooms from MongoDB
// @route   GET /api/admin/rooms
// @access  Private/Admin
const getAdminRooms = async (req, res) => {
  try {
    const rooms = await CodingRoom.find()
      .populate('owner', 'name email')
      .sort({ updatedAt: -1 });

    const formattedRooms = rooms.map((room) => ({
      id: room.roomId,
      _id: room._id,
      name: room.roomName,
      owner: room.owner ? room.owner.name : 'Anonymous',
      ownerEmail: room.owner ? room.owner.email : '',
      language: room.language,
      members: room.members ? room.members.length : 1,
      status: 'Active',
      description: room.description,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      count: formattedRooms.length,
      rooms: formattedRooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error retrieving rooms directory',
      error: error.message,
    });
  }
};

// @desc    Delete a user (Admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteAdminUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Administrator cannot delete their own account.',
      });
    }

    await user.deleteOne();
    // Clean up their rooms and saved codes
    await CodingRoom.deleteMany({ owner: user._id });
    await SavedCode.deleteMany({ user: user._id });

    return res.status(200).json({
      success: true,
      message: `User ${user.name} and associated data successfully removed from MongoDB.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error deleting user',
      error: error.message,
    });
  }
};

// @desc    Delete a room (Admin only)
// @route   DELETE /api/admin/rooms/:id
// @access  Private/Admin
const deleteAdminRoom = async (req, res) => {
  try {
    const queryId = req.params.id.trim();
    const room = await CodingRoom.findOne({
      $or: [{ roomId: queryId.toUpperCase() }, { _id: queryId.match(/^[0-9a-fA-F]{24}$/) ? queryId : null }],
    });

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    await room.deleteOne();

    return res.status(200).json({
      success: true,
      message: `Room ${room.roomName} successfully deleted by Administrator.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error deleting room',
      error: error.message,
    });
  }
};

// @desc    Test admin access endpoint
// @route   GET /api/admin/test
// @access  Private/Admin
const adminTest = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Admin access granted. You are authorized to access this restricted route.',
    adminUser: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

module.exports = {
  getAdminStats,
  getAdminUsers,
  getAdminRooms,
  deleteAdminUser,
  deleteAdminRoom,
  adminTest,
};
