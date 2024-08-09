// tests/api/matching.test.js
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

describe('Matching API', () => {
  it('should match a volunteer to an event', async () => {
    const match = { volunteer_id: 1, event_id: 1 };
    const res = await request(server).post('/api/matching').send(match);
    expect(res.statusCode).toBe(201);
  });
});
