const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please enter your quantity'],
    default: 1,
  },
  qrcode: {
    type: String,
    default: '',
  },

  userID: {
    type: String,
    required: [true, 'Please enter the user ID'],
  },

  order_status: {
    type: String,
    default: '',
  },

  orderDate: {
    type: Date,
    required: [true, 'Please enter the event Date'],
  },
});

module.exports = mongoose.model('Order', orderSchema);
