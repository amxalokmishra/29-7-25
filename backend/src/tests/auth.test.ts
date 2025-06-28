import request from 'supertest';
import { app } from '../app';
import { AppDataSource } from '../config/data-source';

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

describe('Auth API', () => {
  it('should login admin and return token', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'admin123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should fail on wrong credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'wrong' });

    expect(res.statusCode).toBe(401);
  });
});