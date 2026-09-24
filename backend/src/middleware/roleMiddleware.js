const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Forbidden: Admin privileges required to access this resource.',
  });
};

module.exports = { authorizeAdmin };
