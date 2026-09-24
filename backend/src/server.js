const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from CollabCode root .env or backend .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 CollabCode server running on port ${PORT}`);
  console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
});

module.exports = server;
