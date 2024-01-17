const request = require('supertest');
const app = require('../app');
const Shoe = require('../models/shoe');
const mongoose = require('mongoose');

require('dotenv').config();
const validToken = process.env.VALID_TOKEN;

describe('Test della rotta di aggiunta scarpa', () => {
  // Pulisce il database prima di ogni test
  beforeAll(async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected!');

  });

  afterAll(async () => {
    // Pulisci il database dopo aver eseguito i test
    await Shoe.deleteMany({});
    mongoose.connection.close(true);
    console.log("Database connection closed");
  });

  test('Dovrebbe aggiungere una nuova scarpa', async () => {
    

    // Dati per la nuova scarpa
    const newShoeData = {
      brand: 'Nike',
      model: 'Air Force',
      description: 'Comfortable sneakers',
      price: 120,
    };

    // Effettua una richiesta alla rotta di aggiunta scarpa includendo il token
    const response = await request(app)
      .post('/addshoe')
      .set('Authorization', `${validToken}`)
      .send(newShoeData);

    // Verifica che la risposta sia uno stato 201 (Created)
    expect(response.status).toBe(201);

    // Verifica che la risposta contenga i dati della scarpa appena inserita
    expect(response.body.brand).toBe(newShoeData.brand);
    expect(response.body.model).toBe(newShoeData.model);
    expect(response.body.description).toBe(newShoeData.description);
    expect(response.body.price).toBe(newShoeData.price);
  });

  test('Dovrebbe gestire errori interni restituendo uno stato 500', async () => {
    // Simula un errore interno durante l'aggiunta della scarpa
    jest.spyOn(Shoe.prototype, 'save').mockRejectedValueOnce(new Error('Errore interno'));
  
    // Effettua una richiesta alla rotta di aggiunta scarpa includendo il token valido
    const response = await request(app)
      .post('/addshoe')
      .set('Authorization', `${validToken}`)
      .send({ brand: 'Nike', model: 'Air Max', description: 'Comfortable shoes', price: 100 });
  
    // Verifica che la risposta sia uno stato 500
    expect(response.status).toBe(500);
  });
});
