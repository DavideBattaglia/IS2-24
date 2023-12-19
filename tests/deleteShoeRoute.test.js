//test/deleteShoeRoute.test.js
const request = require('supertest');
const app = require('../app');
const Shoe = require('../models/shoe');

// Token valido
require('dotenv').config();
const validToken = process.env.VALID_TOKEN;


describe('Test della rotta /deleteShoe', () => {
  beforeEach(async () => {
    await Shoe.deleteMany();
  });

  it('Dovrebbe eliminare una scarpa', async () => {
    // Crea una scarpa nel database
    const shoe = await Shoe.create({ brand: 'Nike', model: 'Air Max' });

    // Effettua una richiesta alla rotta /deleteShoe includendo il token
    const response = await request(app)
      .delete(`/deleteShoe/${shoe._id}`)
      .set('Authorization', `${validToken}`);

    // Verifica che la risposta sia uno stato 200
    expect(response.status).toBe(200);

    // Verifica che la risposta contenga il messaggio e la scarpa eliminata
    expect(response.body.message).toBe('Scarpa eliminata con successo');
    expect(response.body.deletedShoe._id).toBe(shoe._id.toString());
    expect(response.body.deletedShoe.brand).toBe(shoe.brand);
    expect(response.body.deletedShoe.model).toBe(shoe.model);
  });

  it('Dovrebbe gestire una scarpa non trovata restituendo uno stato 404', async () => {
    // ID non esistente
    const nonExistingShoeId = '60ae3eab045b7878982a036a';

    // Effettua una richiesta alla rotta /deleteShoe includendo il token
    const response = await request(app)
      .delete(`/deleteShoe/${nonExistingShoeId}`)
      .set('Authorization', `${validToken}`);

    // Verifica che la risposta sia uno stato 404
    expect(response.status).toBe(404);
  });

  it('Dovrebbe gestire errori interni restituendo uno stato 500', async () => {
    // Simula un errore interno nell'eliminazione della scarpa
    jest.spyOn(Shoe, 'findOneAndDelete').mockImplementationOnce(() => {
      throw new Error('Errore interno');
    });

    // Effettua una richiesta alla rotta /deleteShoe includendo il token
    const response = await request(app)
      .delete(`/deleteShoe/invalidId`)
      .set('Authorization', `${validToken}`);

    // Verifica che la risposta sia uno stato 500
    expect(response.status).toBe(500);
  });
});
