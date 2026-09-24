const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const mongoose = require('mongoose');
const app = require('./src/app');
const User = require('./src/models/User');
const http = require('http');

async function testAtlasIntegration() {
  console.log('🔄 Connecting to MongoDB Atlas...');
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Atlas Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB Atlas Connection Failed:', err.message);
    process.exit(1);
  }

  // Start temporary server for live API tests
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    const testEmail = `testuser_${Date.now()}@example.com`;
    const testPassword = 'Password123!';
    const testName = 'Meghana User';

    console.log('\n1. Testing Registration Endpoint (POST /api/auth/register)...');
    const regRes = await fetch(`${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: testName,
        email: testEmail,
        password: testPassword,
      }),
    });
    const regData = await regRes.json();
    console.log('Registration Status:', regRes.status, regData.message);

    if (regRes.status !== 201 || !regData.token) {
      throw new Error(`Registration failed: ${JSON.stringify(regData)}`);
    }

    console.log('\n2. Testing Login Endpoint (POST /api/auth/login)...');
    const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword,
      }),
    });
    const loginData = await loginRes.json();
    console.log('Login Status:', loginRes.status, loginData.message);

    if (loginRes.status !== 200 || !loginData.token) {
      throw new Error(`Login failed: ${JSON.stringify(loginData)}`);
    }

    const token = loginData.token;

    console.log('\n3. Testing Protected Profile Endpoint (GET /api/auth/me)...');
    const meRes = await fetch(`${baseUrl}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const meData = await meRes.json();
    console.log('Protected Route Status:', meRes.status, 'User Name:', meData.user?.name, 'Role:', meData.user?.role);

    if (meRes.status !== 200 || meData.user?.email !== testEmail) {
      throw new Error(`Protected route validation failed: ${JSON.stringify(meData)}`);
    }

    console.log('\n4. Testing Direct MongoDB Atlas Query...');
    const savedUser = await User.findOne({ email: testEmail });
    console.log(`Found user in MongoDB Atlas: ID=${savedUser._id}, Role=${savedUser.role}, PasswordHashed=${savedUser.password.startsWith('$2')}`);

    // Clean up test user
    await User.deleteOne({ email: testEmail });
    console.log('🧹 Cleaned up test user record from MongoDB Atlas.');

    console.log('\n🎉 ALL LIVE ATLAS & JWT AUTH TESTS PASSED SUCCESSFULLY!');
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  } finally {
    server.close();
    await mongoose.disconnect();
  }
}

testAtlasIntegration();
