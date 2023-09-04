const mongoose = require('mongoose');

const eventRegisSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name'],
  },
  phone: {
    type: Number,
    required: [true, 'Please enter your phone number'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email number'],
  },
  eventName: {
    type: String,
  },
  eventID: {
    type: String,
    required: [true, 'Please enter the event ID'],
  },
  support: {
    type: String,
  },
  order_notes: {
    type: String,
  },
  used: {
    type: Boolean,
    default: false,
  },
  count: {
    type: Number,
    default: 1,
  },
  qrcode: {
    type: String,
    default: '',
  },
  paymentId:{
    type: String,
  }
},
{
  timestamps: true,
}
);

module.exports = mongoose.model('EventRegis', eventRegisSchema);
