const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter title'],
  },
  poster: {
    type: String,
    required: [true, 'Please enter poster'],
  },
  content: {
    type: String,
    required: [true, 'Please enter content'],
  },
  category: {
    type: String,
    required: [true, 'Please enter category'],
  },
  date: {
    type: Date,
    required: [true, 'Please enter date'],
  },
});

module.exports = mongoose.model('Article', articleSchema);
