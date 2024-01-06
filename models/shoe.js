
// models/shoe.js
const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
});

const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;