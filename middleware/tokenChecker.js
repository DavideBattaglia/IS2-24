const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

describe('Test della rotta /login con tokenChecker', () => {
  // Pulisce il database prima di ogni test
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('Dovrebbe autenticare l\'utente, restituire uno stato 200 e ricevere un token valido', async () => {
    // Crea un utente nel database
    const hashedPassword = await bcrypt.hash('password_sicura', 10);
    await User.create({
      username: 'utente_autenticato',
      password: hashedPassword,
    });

    const credentials = {
      username: 'utente_autenticato',
      password: 'password_sicura',
    };

    // Effettua l'accesso e ricevi il token
    const loginResponse = await request(app)
      .post('/login')
      .send(credentials);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');

    const token = loginResponse.body.token;

    // Usa il token per accedere a una rotta protetta
    const protectedRouteResponse = await request(app)
      .get('/protected')
      .set('Authorization', `${token}`);

    // Verifica che la rotta protetta ritorni uno stato 200
    expect(protectedRouteResponse.status).toBe(200);
  });

  // Aggiungi ulteriori test se necessario
});
