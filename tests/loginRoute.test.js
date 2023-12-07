const request = require('supertest');
const app = require('../app');  // Assicurati di importare correttamente il tuo file principale dell'app

describe('POST /login', () => {
  it('should respond with a JWT token on successful login', async () => {
    const userCredentials = {
      username: 'exampleUser',
      password: 'examplePassword',
    };

    // Supponiamo che tu abbia un utente di esempio nel tuo database
    // Puoi creare un utente di esempio prima di eseguire questo test
    // o modificare le credenziali dell'utente in base al tuo ambiente di sviluppo

    const response = await request(app)
      .post('/login')
      .send(userCredentials)
      .expect('Content-Type', /json/)
      .expect(200);

    // Verifica che la risposta contenga un token JWT
    expect(response.body).toHaveProperty('token');
  });

  it('should respond with a 401 status on unsuccessful login', async () => {
    const invalidCredentials = {
      username: 'nonexistentUser',
      password: 'invalidPassword',
    };

    const response = await request(app)
      .post('/login')
      .send(invalidCredentials)
      .expect('Content-Type', /json/)
      .expect(401);

    // Verifica che la risposta contenga il messaggio corretto
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });
});
