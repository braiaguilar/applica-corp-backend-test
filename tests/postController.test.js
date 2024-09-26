const request = require('supertest');
const app = require('../src/app');

describe('GET /posts', () => {
    it('should return paginated posts', async () => {
        const res = await request(app)
            .get('/posts?start=0&size=10')
            .expect(200);
        expect(res.body).toHaveLength(10);
        expect(res.body[0]).toHaveProperty('userId');
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('title');
        expect(res.body[0]).toHaveProperty('body');
        expect(res.body[0]).toHaveProperty('user');
        expect(res.body[0]).toHaveProperty('comments');
    });

    it('should return 404 when no posts are found', async () => {
        await request(app).get('/posts?start=1000&size=10').expect(404);
    });

    it('should return 400 when start value is invalid', async () => {
        await request(app).get('/posts?start=-9').expect(400);
    });

    it('should return 400 when size value is invalid', async () => {
        await request(app).get('/posts?size=-9').expect(400);
    });
});
