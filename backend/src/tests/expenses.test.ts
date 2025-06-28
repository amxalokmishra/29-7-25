import request from 'supertest';
import { app } from '../app';
import { AppDataSource } from '../config/data-source';

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

let employeeToken: string;

beforeAll(async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({ email: 'emp1@example.com', password: 'emp123' });

  employeeToken = res.body.token;
});

describe('Expense API', () => {
  it('should allow employee to create an expense', async () => {
    const res = await request(app)
      .post('/expenses')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({
        amount: 500,
        category: 'Food',
        description: 'Test Lunch',
        date: '2025-06-29',
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('should return expenses for employee', async () => {
    const res = await request(app)
      .get('/expenses')
      .set('Authorization', `Bearer ${employeeToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});