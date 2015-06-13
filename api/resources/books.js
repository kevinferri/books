var Book = require('../models/book.js');
var googleBooksAPI = require('../lib/google-books-api.js');
var helpers = require('../lib/helpers.js');

exports.getBooks = function(req, res) {
  Book.find({}, function(err, books) {
    res.json(books);
  });
}

exports.searchBooks = function(req, res) {
  var query = encodeURIComponent(req.param('q'));
  googleBooksAPI.getGoogleBook(query, function(books) {
    if (books.totalItems > 0) {
      res.json(books);
    } else {
      res.json([]);
    }
  });
}

exports.postBook = function(req, res) {
  console.log('Posting...');
}