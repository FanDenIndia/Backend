const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add the Title'],
  },
  poster: {
    type: String,
    required: [true, 'Please add the Poster'],
  },
  videoLink: {
    type: String,
  },
  city: {
    type: String,
    required: [true, 'Please add the city'],
  },
  venue: {
    type: String,
    required: [true, 'Please add the venue'],
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please add the Original Price'],
  },
  discountedPrice: {
    type: Number,
  },
  eventID: {
    type: String,
    required: [true, 'Please enter the event ID'],
  },
  description: {
    type: String,
  },
  
  eventDate: {
    type: Date,
    required: [true, 'Please enter the event Date'],
  },

  quantity: {
    type: Number,
    required: [true, 'Please enter the quantity'],
  },

  payAtVenue:{
    type: Boolean,
    default: false
  },

  featuredEvent:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Event', eventSchema);
