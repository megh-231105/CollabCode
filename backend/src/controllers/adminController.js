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
  adminTest,
};
