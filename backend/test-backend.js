const app = require('./src/app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

process.env.JWT_SECRET = 'test_secret_collabcode_key_123';

async function runTests() {
  console.log('--- Starting CollabCode Comprehensive Backend Tests ---');
  let passed = 0;
  let failed = 0;

  function assert(condition, name) {
    if (condition) {
      console.log(`✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${name}`);
      failed++;
    }
  }

  // Helper to make requests to express app
  const http = require('http');
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // 1: Health check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.message === 'CollabCode backend is running', 'GET /api/health returns 200');

    // 2: Root endpoint
    const rootRes = await fetch(`${baseUrl}/`);
    const rootData = await rootRes.json();
    assert(rootRes.status === 200 && rootData.documentation, 'GET / returns API documentation map');

    // 3: Auth Validation for empty registration
    const emptyRegRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert(emptyRegRes.status === 400, 'POST /api/auth/register rejects missing fields with 400');

    // 4: Auth Validation for short password
    const shortPassRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'test@example.com', password: '123' }),
    });
    assert(shortPassRes.status === 400, 'POST /api/auth/register rejects password shorter than 6 characters');

    // 5: Protected route without token
    const noTokenRes = await fetch(`${baseUrl}/api/auth/me`);
    assert(noTokenRes.status === 401, 'GET /api/auth/me rejects requests without token with 401');

    // 6: Protected route with invalid token
    const invalidTokenRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: 'Bearer invalid.jwt.token' },
    });
    assert(invalidTokenRes.status === 401, 'GET /api/auth/me rejects invalid token with 401');

    // 7: Protected user profile route without token
    const userProfileNoToken = await fetch(`${baseUrl}/api/users/profile`);
    assert(userProfileNoToken.status === 401, 'GET /api/users/profile rejects unauthorized with 401');

    // 8: Protected room create without token
    const roomNoToken = await fetch(`${baseUrl}/api/rooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Room' }),
    });
    assert(roomNoToken.status === 401, 'POST /api/rooms rejects unauthorized with 401');

    // 9: Admin route protection check with role middleware
    const { adminMiddleware } = require('./src/middleware/adminMiddleware');
    let mockReq = { user: { role: 'USER' } };
    let mockRes = {
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.data = data;
        return this;
      },
    };
    let nextCalled = false;
    adminMiddleware(mockReq, mockRes, () => { nextCalled = true; });
    assert(mockRes.statusCode === 403 && !nextCalled, 'adminMiddleware rejects USER role with 403');

    // 10: Admin route authorization with ADMIN role
    mockReq = { user: { role: 'ADMIN' } };
    nextCalled = false;
    adminMiddleware(mockReq, mockRes, () => { nextCalled = true; });
    assert(nextCalled, 'adminMiddleware allows ADMIN role');

    // 11: Password hashing and comparison
    const rawPass = 'secretPassword123';
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(rawPass, salt);
    const isMatch = await bcrypt.compare(rawPass, hashed);
    assert(isMatch && hashed !== rawPass, 'bcryptjs correctly hashes and compares passwords');

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    server.close();
  }

  console.log(`\nVerification Summary: ${passed} Passed, ${failed} Failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
