const express = require('express');
const cors = require('cors');

// Route imports
const healthRoutes = require('./routes/healthRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const roomRoutes = require('./routes/roomRoutes');
const savedCodeRoutes = require('./routes/savedCodeRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Allowed Origins for CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://collab-code-jade.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive fallback for seamless local/deployed demo access
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/saved-code', savedCodeRoutes);
app.use('/api/admin', adminRoutes);

// Root Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to CollabCode Collaborative Code Editor API',
    version: '1.0.0',
    documentation: {
      health: 'GET /api/health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      currentUser: 'GET /api/auth/me',
      profile: 'GET /api/users/profile',
      rooms: 'GET, POST /api/rooms',
      singleRoom: 'GET, PUT, DELETE /api/rooms/:roomId',
      joinRoom: 'POST /api/rooms/:roomId/join',
      savedCode: 'GET, POST /api/saved-code',
      adminStats: 'GET /api/admin/stats',
      adminUsers: 'GET /api/admin/users',
      adminRooms: 'GET /api/admin/rooms',
    },
  });
});

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route Not Found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
