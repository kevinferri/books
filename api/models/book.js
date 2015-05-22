var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: false,
  },
  publishedDate: {
    type: String,
    required: false,
  },
  categories: {
    type: Array,
    required: false
  },
  averageRating: {
    type: Number,
    required: false
  },
  pageCount: {
    type: Number,
    required: false,
  },
}, { versionKey: false });

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;