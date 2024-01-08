<<<<<<< HEAD
const request = require('supertest');
const app = require('../app'); // Assicurati di sostituire con il percorso corretto al tuo file app
const User = require('../models/user'); // Assicurati di sostituire con il percorso corretto al tuo modello utente

describe('Test della rotta /register', () => {
  // Pulisce il database prima di ogni test
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('Dovrebbe registrare un nuovo utente e restituire uno stato 201', (done) => {
    const newUser = {
      username: 'nuovo_utente',
      password: 'password_sicura',
    };

    request(app)
      .post('/register')
      .send(newUser)
      .expect(201)
      .end(async (err, response) => {
        if (err) return done(err);

        // Verifica che l'utente sia effettivamente stato salvato nel database
        const savedUser = await User.findOne({ username: 'nuovo_utente' });
        expect(savedUser).not.toBeNull();

        done();
      });
  });

  it('Dovrebbe gestire la mancanza di username o password restituendo uno stato 400', (done) => {
    const invalidUser = {
      username: '',
      password: 'password_sicura',
    };

    request(app)
      .post('/register')
      .send(invalidUser)
      .expect(400, done);
  });

  it('Dovrebbe gestire l\'uso di un username già esistente restituendo uno stato 400', (done) => {
    // Crea un utente esistente nel database
    User.create({
      username: 'utente_esistente',
      password: 'password_esistente',
    }).then(() => {
      const existingUser = {
        username: 'utente_esistente',
        password: 'nuova_password',
      };

      request(app)
        .post('/register')
        .send(existingUser)
        .expect(400, done);
    });
  });

  // Aggiungi ulteriori test se necessario
});
=======
const request = require('supertest');
const app = require('../app'); // Assicurati di sostituire con il percorso corretto al tuo file app
const User = require('../models/user'); // Assicurati di sostituire con il percorso corretto al tuo modello utente

describe('Test della rotta /register', () => {
  // Pulisce il database prima di ogni test
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('Dovrebbe registrare un nuovo utente e restituire uno stato 201', (done) => {
    const newUser = {
      username: 'nuovo_utente',
      password: 'password_sicura',
    };

    request(app)
      .post('/register')
      .send(newUser)
      .expect(201)
      .end(async (err, response) => {
        if (err) return done(err);

        // Verifica che l'utente sia effettivamente stato salvato nel database
        const savedUser = await User.findOne({ username: 'nuovo_utente' });
        expect(savedUser).not.toBeNull();

        done();
      });
  });

  it('Dovrebbe gestire la mancanza di username o password restituendo uno stato 400', (done) => {
    const invalidUser = {
      username: '',
      password: 'password_sicura',
    };

    request(app)
      .post('/register')
      .send(invalidUser)
      .expect(400, done);
  });

  it('Dovrebbe gestire l\'uso di un username già esistente restituendo uno stato 400', (done) => {
    // Crea un utente esistente nel database
    User.create({
      username: 'utente_esistente',
      password: 'password_esistente',
    }).then(() => {
      const existingUser = {
        username: 'utente_esistente',
        password: 'nuova_password',
      };

      request(app)
        .post('/register')
        .send(existingUser)
        .expect(400, done);
    });
  });

  // Aggiungi ulteriori test se necessario
});
>>>>>>> 2bab63fc7652a56c8514bd7fb4bd1c4511b81b25
