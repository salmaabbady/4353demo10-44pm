// tests/api/history.test.js
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

describe('History API', () => {
  it('should get all history records', async () => {
    const res = await request(server).get('/api/history');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('history');
  });

  it('should create a new history record', async () => {
    const res = await request(server)
      .post('/api/history')
      .send({
        volunteer_id: 1,
        event_id: 2,
        status: 'participated'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('history');
  });
});
