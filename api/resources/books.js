var Book = require('../models/book.js')
var request = require('request');

exports.getBooks = function(req, res) {
  Book.find({}, function(err, books) {
    res.json(books);
  });
}