
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Shoe = require('../models/shoe');
const Cart = require('../models/cart');

require('dotenv').config();
const validToken = process.env.VALID_TOKEN;

describe('/addCart/:shoeId API', () => {
  // Connessione al database prima di tutti i test
  beforeAll(async () => {
    await mongoose.connect('mongodb+srv://provarent:provarent@cluster0.2k797.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Pulizia del database prima di ogni test
  beforeEach(async () => {
    await Cart.deleteMany();
  });

  // Chiusura della connessione al database dopo tutti i test
  afterAll(async () => {
    await mongoose.connection.close();
  });

  // Test case per l'aggiunta al carrello
  it('should add a product to the cart', async () => {
    //const shoeId = mongoose.Shoe.ObjectId(); // Genera un nuovo ObjectId per la scarpa
    const userToken = validToken; 

    // Supertest per inviare una richiesta POST all'API
    const response = await request(app)
      .post(`/addCart/65a18c4284fc5cf756abf7b0`)
      .set('Authorization', `${validToken}`);

    // Verifica la risposta
    expect(response.status).toBe(201); // Verifica che la risposta sia 201 Created
    expect(response.body).toHaveProperty('_id'); // Verifica che la risposta contenga un campo '_id'
    expect(response.body.userId).toBe('userId_value'); // Sostituisci con il valore atteso per l'ID dell'utente
    //expect(response.body.shoeId).toEqual(shoeId); // Verifica che la risposta contenga l'ID della scarpa inviata nella richiesta
  });

  
});
