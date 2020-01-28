const request = require('supertest');
const app = require('../../app');
const db = require('../../database');

describe('note [controller]', () => {
  beforeEach(() => {
    db.init();
  });

  it('should return list of note', async () => {
    const expectedResult = [
      { id: 1, title: 'note title 1', content: 'note content 1' },
      { id: 2, title: 'note title 2', content: 'note content 2' },
      { id: 5, title: 'note title 3', content: 'note content 3' },
      { id: 6, title: 'note title 4', content: 'note content 4' },
      { id: 7, title: 'note title 5', content: 'note content 5' },
    ];

    await request(app)
      .get('/note')
      .send()
      .expect(200)
      .then((response) => {
        const note = JSON.parse(response.text);
        expect(note).toEqual(expectedResult);
        expect(note).toHaveLength(5);
      });
  });

  it('should return note by id', async () => {
    const expectedResult = { id: 5, title: 'note title 3', content: 'note content 3' };

    await request(app)
      .get(`/note/${expectedResult.id}`)
      .send()
      .expect(200)
      .then((response) => {
        const note = JSON.parse(response.text);
        expect(note).toEqual(expectedResult);
      });
  });

  it('should return Bad Request if there is no note with requested id', async () => {
    await request(app)
      .get(`/note/12345`)
      .send()
      .expect(400)
      .then((response) => {
        expect(response.text).toEqual('Bad request');
      });
  });

  it('should add a new note', async () => {
    const expectedResult = { title: 'my test note', content: 'my test content' };

    await request(app)
      .post('/note')
      .set('Content-type', 'application/json')
      .send({ title: expectedResult.title, content: expectedResult.content })
      .expect(200)
      .then((response) => {
        const note = JSON.parse(response.text);
        expect(note).toMatchObject(expectedResult);
        expect(note.id).toBeDefined();
      });
  });

  it('should return bad request if title is missing', async () => {
    await request(app)
      .post('/note')
      .set('Content-type', 'application/json')
      .send({ content: 'test content' })
      .expect(400)
      .then((response) => {
        expect(response.text).toEqual('Bad request');
      });
  });

  it('should update note', async () => {
    const expectedResult = { title: 'my test note', content: 'my test content' };

    await request(app)
      .post('/note')
      .set('Content-type', 'application/json')
      .send({ title: 'some title', content: expectedResult.content })
      .expect(200)
      .then((response) => {
        const note = JSON.parse(response.text);
        expectedResult.id = note.id;
      });

    await request(app)
      .put(`/note/${expectedResult.id}`)
      .set('Content-type', 'application/json')
      .send({ id: expectedResult.id, title: expectedResult.title, content: expectedResult.content })
      .expect(200)
      .then((response) => {
        const note = JSON.parse(response.text);
        expect(note).toEqual(expectedResult);
      });

    await request(app)
      .get(`/note/${expectedResult.id}`)
      .send()
      .expect(200)
      .then((response) => {
        const note = JSON.parse(response.text);
        expect(note).toEqual(expectedResult);
      });
  });

  it(`should return 400 if id parameter doesn't match body one`, async () => {
    const expectedResult = { title: 'my test note', content: 'my test content' };

    await request(app)
      .post('/note')
      .set('Content-type', 'application/json')
      .send({ title: 'some title', content: expectedResult.content })
      .expect(200)
      .then((response) => {
        const note = JSON.parse(response.text);
        expectedResult.id = note.id;
      });

    await request(app)
      .put(`/note/${expectedResult.id}`)
      .set('Content-type', 'application/json')
      .send({ id: 123, title: expectedResult.title, content: expectedResult.content })
      .expect(400)
      .then((response) => {
        expect(response.text).toEqual('Bad request');
      });
  });

  it('should delete note', async () => {
    const expectedResult = { title: 'my test note', content: 'my test content' };

    await request(app)
      .post('/note')
      .set('Content-type', 'application/json')
      .send({ title: 'some title', content: expectedResult.content })
      .expect(200)
      .then((response) => {
        const note = JSON.parse(response.text);
        expectedResult.id = note.id;
      });

    await request(app)
      .delete(`/note/${expectedResult.id}`)
      .set('Content-type', 'application/json')
      .send()
      .expect(200)
      .then((response) => {
        expect(response.text).toEqual('OK');
      });

    await request(app)
      .get(`/note/${expectedResult.id}`)
      .set('Content-type', 'application/json')
      .send()
      .expect(400)
      .then((response) => {
        expect(response.text).toEqual('Bad request');
      });
  });
});
