var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: false,
  },
  pages: {
    type: Number,
    required: false,
  },
}, { versionKey: false });

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;