var Book = require('../models/book.js');
var googleBooksAPI = require('../lib/google-books-api.js');
var helpers = require('../lib/helpers.js');

exports.getBooks = function(req, res) {
  Book.find({}, function(err, books) {
    res.json(books);
  });
}

// TODO: return books using only the data we care about
exports.getGoogleBooks = function(req, res) {
  var query = encodeURIComponent(req.param('q'));
  googleBooksAPI.getGoogleBooks(query, function(err, books) {
    if (err) {
      throw err;
    }
    if (books.totalItems > 0) {
      res.status(200).json(books);
    } else {
      res.json([]);
    }
  });
}

exports.getGoogleBook = function(req, res) {
  var id = req.params.id;
  googleBooksAPI.getGoogleBook(id, function(err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
}

exports.postBook = function(req, res) {
  helpers.getRequestBody(req, res, function(err, body) {
    if (err) {
      throw err;
    }
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
