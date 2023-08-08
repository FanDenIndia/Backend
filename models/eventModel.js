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
  city: {
    type: String,
    required: [true, 'Please add the city'],
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
  eventDate: {
    type: Date,
    required: [true, 'Please enter the event Date'],
  },
});

module.exports = mongoose.model('Event', eventSchema);
