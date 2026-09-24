const app = require('./src/app');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

process.env.JWT_SECRET = 'test_secret_collabcode_key_123';

async function runTests() {
  console.log('--- Starting Backend Verification Tests ---');
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

  // Helper to make mock requests to express app without running a live network port
  const http = require('http');
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    // Test 1: GET /api/health
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.message === 'CollabCode backend is running', 'GET /api/health returns 200 and expected message');

    // Test 2: GET / (root API info)
    const rootRes = await fetch(`${baseUrl}/`);
    const rootData = await rootRes.json();
    assert(rootRes.status === 200 && rootData.endpoints, 'GET / returns 200 with API endpoints map');

    // Test 3: Auth Validation for empty registration
    const emptyRegRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert(emptyRegRes.status === 400, 'POST /api/auth/register rejects missing fields with 400');

    // Test 4: Auth Validation for short password
    const shortPassRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test', email: 'test@example.com', password: '123' }),
    });
    assert(shortPassRes.status === 400, 'POST /api/auth/register rejects password shorter than 6 characters');

    // Test 5: Protected route without token
    const noTokenRes = await fetch(`${baseUrl}/api/auth/me`);
    assert(noTokenRes.status === 401, 'GET /api/auth/me rejects requests without token with 401');

    // Test 6: Protected route with invalid token
    const invalidTokenRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: 'Bearer invalid.jwt.token' },
    });
    assert(invalidTokenRes.status === 401, 'GET /api/auth/me rejects invalid token with 401');

    // Test 7: Admin route protection with USER role token
    const userToken = jwt.sign({ id: '507f1f77bcf86cd799439011', email: 'user@example.com', role: 'USER' }, process.env.JWT_SECRET);
    // Since req.user is loaded via User.findById in middleware, let's verify roleMiddleware unit logic
    const { authorizeAdmin } = require('./src/middleware/roleMiddleware');
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
    authorizeAdmin(mockReq, mockRes, () => { nextCalled = true; });
    assert(mockRes.statusCode === 403 && !nextCalled, 'RoleMiddleware rejects USER role with 403');

    // Test 8: Admin route authorization with ADMIN role
    mockReq = { user: { role: 'ADMIN' } };
    nextCalled = false;
    authorizeAdmin(mockReq, mockRes, () => { nextCalled = true; });
    assert(nextCalled, 'RoleMiddleware allows ADMIN role');

    // Test 9: Password hashing check
    const rawPass = 'secretPassword123';
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(rawPass, salt);
    const isMatch = await bcrypt.compare(rawPass, hashed);
    assert(isMatch && hashed !== rawPass, 'bcryptjs correctly hashes and validates passwords');

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
