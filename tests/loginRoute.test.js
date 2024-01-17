const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Token valido
require('dotenv').config();
const validToken = process.env.VALID_TOKEN;

describe('Test del middleware tokenChecker', () => {
  // Pulisce il database prima di ogni test
  beforeAll(async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected!');

  });

  afterAll(async () => {
    // Pulisci il database dopo aver eseguito i test
    await User.deleteMany({});
    mongoose.connection.close(true);
    console.log("Database connection closed");
  });

  test('Dovrebbe proteggere una rotta richiedendo un token valido', async () => {
    // Crea un utente nel database
    const hashedPassword = await bcrypt.hash('password_sicura', 10);
    await User.create({
      username: 'utente_protetto',
      password: hashedPassword,
    });

    // Richiedi una rotta protetta utilizzando il token valido
    const protectedRouteResponse = await request(app)
      .get('/protected')
      .set('Authorization', `${validToken}`);

    // Verifica che la rotta protetta ritorni uno stato 200
    expect(protectedRouteResponse.status).toBe(200);
  });


  test('Deve ritornarmi 401 se le credenziali sono sbagliate', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'UserNnValido', password: 'PassNnValida' });

    expect(response.status).toBe(401);
  });

  test('Dovrebbe gestire una richiesta senza token restituendo uno stato 401', async () => {
    // Richiedi una rotta protetta senza fornire un token valido
    const protectedRouteResponse = await request(app)
      .get('/protected');

    // Verifica che la rotta protetta ritorni uno stato 401
    expect(protectedRouteResponse.status).toBe(401);
  });
});
