var angular = require('angular');
var angularRoute = require('angular-route');
var client = require('./client.js');
var app = angular.module('books', []);
var controllers = require('./controllers/main.js');

module.exports = app;