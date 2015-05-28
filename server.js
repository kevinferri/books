var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apiRoutes = require('./api/routes');
var mongoose = require('mongoose');
var db = require('./config/db')
var app = express();
var debug = require('debug')('books');

var env = process.env.NODE_ENV || 'development';

mongoose.connect(db[env]);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(__dirname + '/src/build'));

app.use('/api', apiRoutes);
app.get('*', function(req, res) {
  res.sendfile(path.resolve(__dirname + '/src/build/main.html'));
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

module.exports = app;