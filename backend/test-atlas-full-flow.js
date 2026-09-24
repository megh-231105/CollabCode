const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = require('./src/app');
const User = require('./src/models/User');
const CodingRoom = require('./src/models/CodingRoom');
const SavedCode = require('./src/models/SavedCode');

async function runAtlasFullFlowTest() {
  console.log('====================================================');
  console.log('🧪 Starting Full-Stack End-to-End Live Atlas Verification');
  console.log('====================================================\n');

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('❌ MONGODB_URI missing in .env!');
    process.exit(1);
  }

  // 1. Connect Mongoose to Atlas
  await mongoose.connect(uri);
  console.log('✅ Connected to MongoDB Atlas Cloud Cluster');

  // Start temporary local test server on an ephemeral port
  const http = require('http');
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      failed++;
    }
  }

  const testEmail = `student_${Date.now()}@collabcode.dev`;
  const testPassword = 'Password123!';
  let userToken = '';
  let userId = '';
  let testRoomId = '';
  let testSnippetId = '';

  try {
    // -----------------------------------------------------------------
    // TEST 1: Health Endpoint
    // -----------------------------------------------------------------
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.message.includes('running'), 'GET /api/health returns 200 and healthy status');

    // -----------------------------------------------------------------
    // TEST 2: User Registration (Phase 4)
    // -----------------------------------------------------------------
    const regRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Meghana Test',
        email: testEmail,
        password: testPassword,
      }),
    });
    const regData = await regRes.json();
    assert(regRes.status === 201 && regData.user.role === 'USER' && !regData.user.password, 'POST /api/auth/register creates user with role USER and no plain password');

    // -----------------------------------------------------------------
    // TEST 3: Duplicate Registration Rejection
    // -----------------------------------------------------------------
    const dupRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Meghana Duplicate',
        email: testEmail,
        password: testPassword,
      }),
    });
    assert(dupRes.status === 400, 'POST /api/auth/register rejects duplicate email address with 400');

    // -----------------------------------------------------------------
    // TEST 4: User Login & JWT Generation (Phase 5)
    // -----------------------------------------------------------------
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });
    const loginData = await loginRes.json();
    assert(loginRes.status === 200 && loginData.token && loginData.user.name === 'Meghana Test', 'POST /api/auth/login returns valid JWT and safe user data');
    userToken = loginData.token;
    userId = loginData.user.id;

    // -----------------------------------------------------------------
    // TEST 5: Verify Hashed Password in Atlas (Phase 3)
    // -----------------------------------------------------------------
    const rawUserDoc = await User.findById(userId);
    assert(rawUserDoc && rawUserDoc.password.startsWith('$2'), 'MongoDB Atlas contains bcrypt hashed password, not plaintext');

    // -----------------------------------------------------------------
    // TEST 6: Authenticated Profile (Phase 6 & 7)
    // -----------------------------------------------------------------
    const meRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const meData = await meRes.json();
    assert(meRes.status === 200 && meData.user.email === testEmail, 'GET /api/auth/me returns authenticated user details from MongoDB Atlas');

    // -----------------------------------------------------------------
    // TEST 7: Create Coding Room (Phase 8)
    // -----------------------------------------------------------------
    const createRoomRes = await fetch(`${baseUrl}/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        name: 'DSA Blitz Live',
        description: 'Solving Graph and DP algorithms in C++',
        language: 'C++',
      }),
    });
    const createRoomData = await createRoomRes.json();
    testRoomId = createRoomData.room.id;
    assert(createRoomRes.status === 201 && testRoomId && createRoomData.room.code.includes('iostream'), 'POST /api/rooms creates room in MongoDB Atlas with starter code');

    // -----------------------------------------------------------------
    // TEST 8: Get Single Room & Update Code (Phase 9)
    // -----------------------------------------------------------------
    const updatedCode = `#include <iostream>\nusing namespace std;\nint main() { cout << "Live Atlas Test Passed!" << endl; return 0; }`;
    const updateRoomRes = await fetch(`${baseUrl}/api/rooms/${testRoomId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        code: updatedCode,
        language: 'C++',
      }),
    });
    const updateRoomData = await updateRoomRes.json();
    assert(updateRoomRes.status === 200 && updateRoomData.room.code === updatedCode, 'PUT /api/rooms/:roomId updates and persists code in MongoDB Atlas');

    // Verify retrieval
    const getRoomRes = await fetch(`${baseUrl}/api/rooms/${testRoomId}`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    const getRoomData = await getRoomRes.json();
    assert(getRoomRes.status === 200 && getRoomData.room.code === updatedCode, 'GET /api/rooms/:roomId retrieves updated code from MongoDB Atlas');

    // -----------------------------------------------------------------
    // TEST 9: Save Code to Personal Catalog (Phase 9)
    // -----------------------------------------------------------------
    const saveSnippetRes = await fetch(`${baseUrl}/api/saved-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`,
      },
      body: JSON.stringify({
        title: 'Binary Search Implementation',
        language: 'C++',
        code: updatedCode,
      }),
    });
    const saveSnippetData = await saveSnippetRes.json();
    testSnippetId = saveSnippetData.snippet.id;
    assert(saveSnippetRes.status === 201 && testSnippetId, 'POST /api/saved-code persists code snippet to user catalog in MongoDB Atlas');

    // -----------------------------------------------------------------
    // TEST 10: Security - Reject USER from Admin APIs (Phase 10 & 15)
    // -----------------------------------------------------------------
    const adminBlockedRes = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    assert(adminBlockedRes.status === 403, 'GET /api/admin/stats strictly blocks normal USER with HTTP 403 Forbidden');

    // -----------------------------------------------------------------
    // TEST 11: Admin Access with ADMIN Role (Phase 10)
    // -----------------------------------------------------------------
    // Temporarily elevate test user to ADMIN in Atlas to test admin dashboard
    await User.findByIdAndUpdate(userId, { role: 'ADMIN' });
    const adminToken = jwt.sign(
      { id: userId, email: testEmail, role: 'ADMIN' },
      process.env.JWT_SECRET || 'collabcode_secret_key_jwt_2026_secure',
      { expiresIn: '1h' }
    );

    const adminStatsRes = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const adminStatsData = await adminStatsRes.json();
    assert(adminStatsRes.status === 200 && adminStatsData.stats.totalUsers >= 1, 'GET /api/admin/stats succeeds for ADMIN and returns real MongoDB metrics');

    const adminUsersRes = await fetch(`${baseUrl}/api/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const adminUsersData = await adminUsersRes.json();
    assert(adminUsersRes.status === 200 && adminUsersData.users.length >= 1, 'GET /api/admin/users returns real registered users from MongoDB Atlas');

    const adminRoomsRes = await fetch(`${baseUrl}/api/admin/rooms`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const adminRoomsData = await adminRoomsRes.json();
    assert(adminRoomsRes.status === 200 && adminRoomsData.rooms.length >= 1, 'GET /api/admin/rooms returns real coding rooms from MongoDB Atlas');

  } catch (err) {
    console.error('💥 Test Execution Error:', err);
    failed++;
  } finally {
    // -----------------------------------------------------------------
    // CLEANUP TEST RECORDS FROM ATLAS
    // -----------------------------------------------------------------
    console.log('\n🧹 Cleaning up test records from MongoDB Atlas...');
    if (userId) {
      await User.findByIdAndDelete(userId);
    }
    if (testRoomId) {
      await CodingRoom.findOneAndDelete({ roomId: testRoomId });
    }
    if (testSnippetId) {
      await SavedCode.findByIdAndDelete(testSnippetId);
    }
    console.log('✅ Cleanup complete. Atlas database remains pristine.');

    server.close();
    await mongoose.connection.close();
  }

  console.log(`\n====================================================`);
  console.log(`🎯 End-to-End Verification Results: ${passed} Passed, ${failed} Failed`);
  console.log(`====================================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runAtlasFullFlowTest();
