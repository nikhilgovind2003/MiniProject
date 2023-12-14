const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    sttypear: Number,
    required: true,
  },
});


const order = mongoose.model('Product', orderSchema);

module.exports = order