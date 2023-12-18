const request = require('supertest');
const app = require('../app');
const Shoe = require('../models/shoe');

describe('Test della rotta /shoe', () => {
  // Token valido
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImEiLCJpYXQiOjE3MDI5MTM1OTF9.JEXJTutloyJlTXP2PSEECuWXvEGgVdgEmOsWLb_DHDY';

  // Pulisce il database prima di ogni test
  beforeEach(async () => {
    await Shoe.deleteMany();
  });

  it('Dovrebbe restituire tutte le scarpe', async () => {
    // Crea alcune scarpe nel database
    await Shoe.create({ brand: 'Nike', model: 'Air Max' });
    await Shoe.create({ brand: 'Adidas', model: 'Superstar' });

    // Effettua una richiesta alla rotta /shoe includendo il token
    const response = await request(app)
      .get('/shoe')
      .set('Authorization', `${validToken}`);

    // Verifica che la risposta sia uno stato 200
    expect(response.status).toBe(200);

    // Verifica che la risposta contenga le scarpe create
    expect(response.body.length).toBe(2);
    expect(response.body[0].brand).toBe('Nike');
    expect(response.body[1].brand).toBe('Adidas');
  });

  it('Dovrebbe gestire errori interni restituendo uno stato 500', async () => {
    // Simula un errore interno nel recupero delle scarpe
    jest.spyOn(Shoe, 'find').mockImplementationOnce(() => {
      throw new Error('Errore interno');
    });

    // Effettua una richiesta alla rotta /shoe includendo il token
    const response = await request(app)
      .get('/shoe')
      .set('Authorization', `${validToken}`);

    // Verifica che la risposta sia uno stato 500
    expect(response.status).toBe(500);
  });

  // Aggiungi ulteriori test se necessario
});
