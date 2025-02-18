import request from 'supertest';
import app from '../app';
import { connection } from 'mongoose';

describe('Report API Tests', () => {
  it('should upload a medical report', async () => {
    const res = await request(app)
      .post('/api/reports/upload')
      .send({
        patientId: '12345',
        reportData: 'Sample medical data'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Report uploaded successfully');
  });

  afterAll(async () => {
    await connection.close();
  });
});
