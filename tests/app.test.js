const request = require('supertest');
const jwt= require('jsonwebtoken'); // used to create, sign, and verify tokens
const app = require('../app');

test('app module should be defined', () => {
  expect(app).toBeDefined();
});

test('GET / should return 200',async  () => {
  await request(app)
    .get('/logout')
    .expect(200);
});

test('GET / should return 200',async  () => {
  await request(app)
    .get('/vetrina')
    .expect(200);
});

test('GET / should return 200',async  () => {
  await request(app)
    .get('/carrello')
    .expect(200);
});

test('GET / should return 200',async  () => {
  await request(app)
    .get('/adminpage')
    .expect(200);
});

test('GET / should return 200',async  () => {
  await request(app)
    .get('/aggiungi')
    .expect(200);
});
