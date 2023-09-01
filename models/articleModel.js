const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter title'],
  },
  content: {
    type: String,
    required: [true, 'Please enter content'],
  },

  date: {
    type: Date,
    required: [true, 'Please enter date'],
  },
});

module.exports = mongoose.model('Article', articleSchema);
