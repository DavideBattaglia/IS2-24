



const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/cart');
const app = require('../app');

require('dotenv').config();
const validToken = process.env.VALID_TOKEN;

describe('POST /addCart/:shoeId', () => {
  beforeAll(async () => {
    jest.setTimeout(8000);
    jest.unmock('mongoose');
    connection = await mongoose.connect(process.env.TEST_DB_URL, { useNewUrlParser: true});
    console.log('Database connected!');

  });

  afterAll(async () => {
    // Pulisci il database dopo aver eseguito i test
    await Cart.deleteMany({});
    mongoose.connection.close(true);
    console.log("Database connection closed");
  });
  /*it('should add a product to the cart', async () => {
    // Mock the tokenChecker middleware
    jest.mock('../middleware/tokenChecker', () => (req, res, next) => {
      req.loggedUser.userId =  '659c16e7054bd2780849a64c';
      next();
    });

    const shoeId = '657c7a89e68168425272e2b4';

    const response = await request(app)
      .post(`/addCart/${shoeId}`)
      .set('Authorization', `${validToken}`)
      .expect(201);

    expect(response.body.userId).toBe('659c16e7054bd2780849a64c');
    expect(response.body.shoeId).toBe(shoeId);
  });*/

  test('should handle errors during adding to the cart', async () => {
    // Mock the tokenChecker middleware
    jest.mock('../middleware/tokenChecker', () => (req, res, next) => {
      res.status(403).json({ success: false, message: 'Failed to authenticate token.' });
    });

    const shoeId = 'mockedShoeId';

    const response = await request(app)
      .post(`/addCart/${shoeId}`)
      .set('Authorization', 'Bearer invalidToken') 
      .expect(403);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Failed to authenticate token.');
  });
});