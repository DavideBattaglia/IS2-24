



const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const app = require('../app');

require('dotenv').config();
const validToken = process.env.VALID_TOKEN;


// Replace 'your-mongo-uri' with your actual MongoDB connection string
const mongoURI = process.env.TEST_DB_URL;

beforeAll(async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
});




describe('POST /addCart/:shoeId', () => {
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

  it('should handle errors during adding to the cart', async () => {
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