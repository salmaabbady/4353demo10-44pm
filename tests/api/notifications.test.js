// tests/api/notifications.test.js
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

describe('Notification API', () => {
  it('should get all notifications', async () => {
    const res = await request(server).get('/api/notifications');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('notifications');
  });

  it('should create a new notification', async () => {
    const res = await request(server)
      .post('/api/notifications')
      .send({
        title: 'New Notification',
        content: 'Notification content'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('notification');
  });
});
