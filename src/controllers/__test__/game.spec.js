const request = require('supertest');
const app = require('../../app');

describe('game [controller]', () => {
  it('should return game information', async () => {
    await request(app)
      .get('games')
      .send()
      .expect(200)
      .then((response) => expect(response.text).toEqual);
  });
});
