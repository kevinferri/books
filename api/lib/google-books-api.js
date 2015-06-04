var config = require('../config.js');
var request = require('request');

exports.getGoogleBook = function(query, callback) {
  var url = config.googleBooksAPI.url + query;

  request({ url: url, json: true }, function(err, response, body) {
    if (err) {
      return callback(err);
    }

    if (response.statusCode === 404) {
      return callback({ error: 'No google book found' });
    }

    if (response.statusCode === 200) { 
      return callback(body);
    }
  });
}