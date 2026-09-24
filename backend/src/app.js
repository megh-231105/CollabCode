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

// Comprehensive Allowed Origins for Local and Deployed Environments
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://collab-code-jade.vercel.app',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const isExplicitlyAllowed = allowedOrigins.includes(origin);
    const isVercelDomain = origin.endsWith('.vercel.app');
    const isRenderDomain = origin.endsWith('.onrender.com');

    if (isExplicitlyAllowed || isVercelDomain || isRenderDomain) {
      return callback(null, true);
    }
    // Permissive fallback so legitimate client apps don't get blocked
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  exposedHeaders: ['Authorization'],
};

// 1. Primary CORS middleware
app.use(cors(corsOptions));

// 2. Preflight handling for all routes
app.options('*', cors(corsOptions));

// 3. Fallback Header Injector & OPTIONS handler
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With, Accept, Origin'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

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
    status: 'ONLINE',
    environment: process.env.NODE_ENV || 'production',
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
