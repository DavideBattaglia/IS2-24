const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Shoe = require('../models/shoe'); // Assicurati di importare correttamente il modello della scarpa
const tokenChecker = require('../middleware/tokenChecker');

require('dotenv').config();
const validToken = process.env.VALID_TOKEN;


describe('test rotta cart', () => {

  let connection;

  beforeAll(async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected!');

  });

  afterAll(async () => {
    // Pulisci il database dopo aver eseguito i test
    await Cart.deleteMany({});
    mongoose.connection.close(true);
    console.log("Database connection closed");
  });

  test('Dovrebbe ottenere tutte le scarpe nel carrello di un utente', async () => {


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

  });

  test('Dovrebbe gestire correttamente gli errori durante la richiesta al carrello', async () => {

    const response = await request(app)
      .get('/cart')
      .set('Authorization', 'unvalid123');

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('success', false);
  });

});
