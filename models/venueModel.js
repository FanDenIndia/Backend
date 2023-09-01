const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  pinCode: {
    type: Number,
    required: [true, 'Please enter your pincode'],
    default: 1,
  },

  city: {
    type: String,
    required: [true, 'Please enter the city'],
  },

  address: {
    type: String,
    required: [true, 'Please enter the address'],
  },
});

module.exports = mongoose.model('Venue', venueSchema);
