const request = require('supertest');
const app = require('../app');
const Shoe = require('../models/shoe');
const mongoose = require('mongoose');
// Token valido
require('dotenv').config();
const validToken = process.env.VALID_TOKEN;


describe('Test della rotta /updateShoe', () => {
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

  test('Dovrebbe aggiornare una scarpa', async () => {
    // Crea una scarpa nel database
    const shoe = await Shoe.create({ brand: 'Nike', model: 'Air Max', description: 'descr', price: 10 });

    // Dati per l'aggiornamento della scarpa
    const updatedData = { brand: 'Adidas', model: 'Superstar' };

    // Effettua una richiesta alla rotta /updateShoe includendo il token
    const response = await request(app)
      .put(`/updateShoe/${shoe._id}`)
      .set('Authorization', `${validToken}`)
      .send(updatedData);

    // Verifica che la risposta sia uno stato 200
    expect(response.status).toBe(200);

    // Verifica che la risposta contenga il messaggio e la scarpa aggiornata
    expect(response.body.message).toBe('Scarpa aggiornata con successo');
    expect(response.body.updatedShoe.brand).toBe(updatedData.brand);
    expect(response.body.updatedShoe.model).toBe(updatedData.model);
  });

  test('Dovrebbe gestire una scarpa non trovata restituendo uno stato 404', async () => {
    // ID non esistente
    const nonExistingShoeId = '60ae3eab045b7878982a036a';

    // Effettua una richiesta alla rotta /updateShoe includendo il token
    const response = await request(app)
      .put(`/updateShoe/${nonExistingShoeId}`)
      .set('Authorization', `${validToken}`)
      .send({ brand: 'Adidas', model: 'Superstar' });

    // Verifica che la risposta sia uno stato 404
    expect(response.status).toBe(404);
  });

  test('Dovrebbe gestire errori interni restituendo uno stato 500', async () => {
    // Simula un errore interno nell'aggiornamento della scarpa
    jest.spyOn(Shoe, 'findByIdAndUpdate').mockImplementationOnce(() => {
      throw new Error('Errore interno');
    });

    // Effettua una richiesta alla rotta /updateShoe includendo il token
    const response = await request(app)
      .put(`/updateShoe/invalidId`)
      .set('Authorization', `${validToken}`)
      .send({ brand: 'Adidas', model: 'Superstar' });

    // Verifica che la risposta sia uno stato 500
    expect(response.status).toBe(500);
  });
});
