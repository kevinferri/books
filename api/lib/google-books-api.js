var config = require('../config.js');
var request = require('request');

exports.getGoogleBook = function(query, done) {
  var url = config.googleBooksAPI.url + query;

  request({ url: url, json: true }, function(err, response, body) {
    if (err) {
      return done(err);
    }

    if (response.statusCode === 404) {
      return done({ error: 'No google book found' });
    }

    if (response.statusCode === 200) { 
      return done(body);
    }
  });
}