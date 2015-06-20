var Book = require('../models/book.js');
var googleBooksAPI = require('../lib/google-books-api.js');
var helpers = require('../lib/helpers.js');

exports.getBooks = function(req, res) {
  Book.find({}, function(err, books) {
    res.json(books);
  });
}

exports.getBook = function(req, res) {
  Book.find({ id: req.params.id }, function(err, book) {
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(200).json({ 'error': 'No book found' });
    }
  });
}

exports.searchGoogleBooks = function(req, res) {
  var query = encodeURIComponent(req.param('q'));
  googleBooksAPI.getGoogleBook(query, function(books) {
    if (books.totalItems > 0) {
      res.status(200).json(books);
    } else {
      res.json([]);
    }
  });
}

exports.postBook = function(req, res) {
  helpers.getRequestBody(req, res, function(body) {
    var newBook = new Book({
      title: body.title,
      description: body.description,
      author: body.author,
      thumbnail: body.thumbnail,
      previewLink: body.previewLink,
      publishedDate: body.publishedDate,
      category: body.category,
      averageRating: body.averageRating,
      pageCount: body.pageCount
    });

    newBook.save(function(err, book) {
      if (err) {
        throw err;
      }
      res.status(200).json(book);
    });
  });
}