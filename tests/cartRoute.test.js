const request = require('supertest');
const app = require('../app');
const Cart = require('../models/cart');
const Shoe = require('../models/shoe'); // Assicurati di importare correttamente il modello della scarpa
const tokenChecker = require('../middleware/tokenChecker');

require('dotenv').config();
const validToken = process.env.VALID_TOKEN;


describe('test rotta cart', () => {
  it('Dovrebbe ottenere tutte le scarpe nel carrello di un utente', async () => {
    // Supponiamo che tu abbia già un utente con un token valido

    // Creare un oggetto carrello nel database associato all'utente
    const cartItem = new Cart({
      userId: '659c16e7054bd2780849a64c',
      shoeId: '657c7a89e68168425272e2b6', 
    });
    await cartItem.save();

    const response = await request(app)
      .get('/cart')
      .set('Authorization', `${validToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    // Verifica che i dettagli delle scarpe siano presenti nella risposta
    //expect(response.body.length).toBeGreaterThan(0); 
  });

  it('Dovrebbe gestire correttamente gli errori durante la richiesta al carrello', async () => {
    // Supponiamo che tu abbia un token non valido 

    const response = await request(app)
      .get('/cart')
      .set('Authorization', 'unvalid123');

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('success', false);
  });

});
