module.exports = (function() {
  'use strict';

  var router = require('express').Router();
  var books = require('./resources/books.js');

  // Books
  router.get('/books', books.getBooks);
  router.post('/books', books.postBook);

  // Google books
  router.get('/googlebooks/:id', books.getGoogleBook);
  router.get('/googlebooks', books.getGoogleBooks);

  return router;
})();
