const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const User = require('../models/user');
const mongoose = require('mongoose');
const isAdmin = require('../middleware/isAdmin');

// Aggiungi le route e i middleware necessari al tuo oggetto app

describe('GET /admin', () => {
    let connection;
    let token;
  
    beforeAll(async () => {
      jest.setTimeout(8000);
      jest.unmock('mongoose');
      connection = await mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Database connected!');
  
      // Crea un utente con isAdmin: true nel database di test
      const adminUser = new User({
        username: 'AdminUser',
        password: 'password123',
        isAdmin: true,
      });
      await adminUser.save();
  
      // Crea un token valido per il test
      const payload = {
        sub: adminUser._id,
        username: adminUser.username,
        isAdmin: adminUser.isAdmin
      };
      token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });
    });
  
    afterAll(async () => {
      // Pulisci il database dopo aver eseguito i test
      await User.deleteMany({});
      mongoose.connection.close(true);
      console.log("Database connection closed");
    });
  

  test('GET /admin without token should return 401', async () => {
    await request(app)
      .get('/admin')
      .expect(401);
  });

  test('GET /admin with invalid token should return 403', async () => {
    await request(app)
      .get('/admin')
      .set('Authorization', 'Bearer invalid-token')
      .expect(403);
  });

  test('GET /admin with valid token and isAdmin true should return user list', async () => {
     
    await request(app)
      .get('/admin')
      .set('Authorization', `${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
      });
  
  test('GET /admin with valid token and isAdmin false should return 403', async () => {

    // Crea un utente con isAdmin: false nel database di test
    const notadmin = new User({
        username: 'notadmin',
        password: 'pwd123',
        isAdmin: false,
      });
      await notadmin.save();
  
      // Crea un token per utente non admin
      const payload = {
        sub: notadmin._id,
        username: notadmin.username,
        isAdmin: notadmin.isAdmin
      };
      var token2 = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });

    await request(app)
      .get('/admin')
      .set('Authorization', `${token2}`)
      .expect(403);
    });
});
