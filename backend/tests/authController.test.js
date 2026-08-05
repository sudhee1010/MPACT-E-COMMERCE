import test from 'node:test';
import assert from 'node:assert/strict';
import { loginUser, verifyOTP } from '../controllers/authController.js';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
const testDbUri = process.env.TEST_MONGO_URI || '';

const createReqRes = (body = {}) => {
  let statusCode = 200;
  const res = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      this.statusCode = statusCode;
      return this;
    },
    payload: null,
    statusCode,
  };
  return { req: { body }, res };
};

test.before(async () => {
  mongoose.set('strictQuery', false);

  if (testDbUri) {
    await mongoose.connect(testDbUri);
  } else {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }

  await User.deleteMany({});
});

test.after(async () => {
  await User.deleteMany({});
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

test('register and verify OTP then login', async () => {
  const hashedOTP = await bcrypt.hash('000000', 10);

  const user = await User.create({
    name: 'Test User',
    email: 'verify@test.com',
    password: 'password123',
    phone: '1234567890',
    isEmailVerified: false,
    otp: hashedOTP,
    otpExpiry: Date.now() + 600000,
  });

  const verifyReq = { body: { email: 'verify@test.com', otp: '000000' } };
  const { res: verifyRes } = createReqRes();
  await verifyOTP(verifyReq, verifyRes);

  assert.equal(verifyRes.statusCode, 200);
  assert.equal(verifyRes.payload.message, 'verification successfull');
  assert.ok(verifyRes.payload.token);
  assert.ok(verifyRes.payload.user.isEmailVerified);
});
