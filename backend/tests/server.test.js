import request from 'supertest';
import { app } from '../src/server.js';

describe('GET /health', () => {
  test('responds with JSON status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'API is running');
    expect(res.body).toHaveProperty('timestamp');
  });
});
