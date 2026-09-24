/**
 * Admin authorization middleware to protect admin routes
 * Ensures the authenticated user has role === 'ADMIN'
 */
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied. Administrator privileges are required.',
  });
};

module.exports = { adminMiddleware, authorizeAdmin: adminMiddleware };
