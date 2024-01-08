<<<<<<< HEAD
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Token valido
require('dotenv').config();
const validToken = process.env.VALID_TOKEN;

describe('Test del middleware tokenChecker', () => {
  // Pulisce il database prima di ogni test
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('Dovrebbe proteggere una rotta richiedendo un token valido', async () => {
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

  it('Dovrebbe gestire una richiesta senza token restituendo uno stato 401', async () => {
    // Richiedi una rotta protetta senza fornire un token valido
    const protectedRouteResponse = await request(app)
      .get('/protected');

    // Verifica che la rotta protetta ritorni uno stato 401
    expect(protectedRouteResponse.status).toBe(401);
  });

  // Aggiungi ulteriori test se necessario
});
=======
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Token valido
require('dotenv').config();
const validToken = process.env.VALID_TOKEN;

describe('Test del middleware tokenChecker', () => {
  // Pulisce il database prima di ogni test
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('Dovrebbe proteggere una rotta richiedendo un token valido', async () => {
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

  it('Dovrebbe gestire una richiesta senza token restituendo uno stato 401', async () => {
    // Richiedi una rotta protetta senza fornire un token valido
    const protectedRouteResponse = await request(app)
      .get('/protected');

    // Verifica che la rotta protetta ritorni uno stato 401
    expect(protectedRouteResponse.status).toBe(401);
  });

  // Aggiungi ulteriori test se necessario
});
>>>>>>> 2bab63fc7652a56c8514bd7fb4bd1c4511b81b25
