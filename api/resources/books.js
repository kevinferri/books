var Book = require('../models/book.js');
var googleBookAPI = require('../lib/google-books-api.js');
var helpers = require('../lib/helpers.js');

exports.getBooks = function(req, res) {
  Book.find({}, function(err, books) {
    res.json(books);
  });
}

exports.postBook = function(req, res) {
  helpers.getRequestBody(req, res, function(body) {
    var q = encodeURIComponent(body.query);
    googleBookAPI.getGoogleBook('harry%20potter', function(book) {
      res.json(book);
    });
  });
}