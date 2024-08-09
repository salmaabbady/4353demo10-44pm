// tests/api/users.test.js
import request from 'supertest';
import { createServer } from 'http';
import next from 'next';

const app = next({ dev: true });
const handle = app.getRequestHandler();
let server;

beforeAll(async () => {
  await app.prepare();
  server = createServer((req, res) => {
    handle(req, res);
  });
  server.listen(3000);
});

afterAll((done) => {
  server.close(done);
});

describe('User API', () => {
  it('should get all users', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('users');
  });

  it('should create a new user', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });
});
