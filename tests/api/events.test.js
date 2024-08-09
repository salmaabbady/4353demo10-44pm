// tests/api/events.test.js
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

describe('Event API', () => {
  it('should get all events', async () => {
    const res = await request(server).get('/api/events');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('events');
  });

  it('should create a new event', async () => {
    const res = await request(server)
      .post('/api/events')
      .send({
        name: 'New Event',
        date: '2024-08-01'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('event');
  });
});
