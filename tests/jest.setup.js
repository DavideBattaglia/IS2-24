const app = require('./app');
const request = require('supertest');

let server;

beforeAll((done) => {
  // Avvia il server prima di tutti i test
  server = app.listen(0, () => {
    console.log('Server in ascolto sulla porta:', server.address().port);
    done();
  });
});

afterAll((done) => {
  // Chiudi il server dopo tutti i test
  server.close(done);
});

global.request = request(app);
