var Book = require('../models/book.js');
var googleBooksAPI = require('../lib/google-books-api.js');
var helpers = require('../lib/helpers.js');

exports.getBooks = function(req, res) {
  Book.find({}, function(err, books) {
    res.json(books);
  });
}

exports.postBook = function(req, res) {
  helpers.getRequestBody(req, res, function(body) {
    var query = encodeURIComponent(JSON.parse(body).query);
    googleBooksAPI.getGoogleBook(query, function(book) {
      res.json(book);
    });
  });
}
