import test from 'node:test';
import assert from 'node:assert/strict';
import { getTokenFromRequest } from '../middlewares/authMiddleware.js';

test('returns bearer token from Authorization header when present', () => {
  const req = {
    headers: { authorization: 'Bearer ios-test-token' },
    cookies: {},
  };

  assert.equal(getTokenFromRequest(req), 'ios-test-token');
});

test('falls back to cookie token when Authorization header is missing', () => {
  const req = {
    headers: {},
    cookies: { token: 'cookie-test-token' },
  };

  assert.equal(getTokenFromRequest(req), 'cookie-test-token');
});
