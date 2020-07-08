const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('Sort', () => {
  it('should return array in specified order', () => {
    const array = [
      { App: 'ROBLOX' },
      { App: 'Candy Crush Saga' },
      { App: 'Slither.io' },
      { App: 'Temple Run 2' },
    ];
    const ordered = [
      { App: 'Candy Crush Saga' },
      { App: 'ROBLOX' },
      { App: 'Slither.io' },
      { App: 'Temple Run 2' },
    ];

    expect(array.sort(app.compareValues('App'))).to.eql(ordered);
  });
});

describe('GET /apps endpoint', () => {
  it('should return an array of objects', () => {
    return supertest(app.app)
      .get('/apps')
      .query({ sort: 'App', genres: 'Action' })
      .expect(200)
      .expect('Content-Type', /json/)
      .then((res) => {
        expect(res.body).to.be.an('array');
        expect(Object.keys(res.body)).to.have.lengthOf.at.least(1);
      });
  });
});
