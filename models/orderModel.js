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
  
  userName: {
    type: String,
    required: [true, 'Please enter the user name'],
  },

  userEmail: {
    type: String,
    required: [true, 'Please enter the user email'],
  },

  userPhone: {
    type: String,
    required: [true, 'Please enter the user phone'],
  },

  paymentId: {
    type: String,
  },

  userAddress: {
    type: String,
    required: [true, 'Please enter the user address'],
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
