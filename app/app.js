var angular = require('angular');
var angularRoute = require('angular-route');
var client = require('./modules/client.js');

var app = angular.module('books', ['ngRoute']);

// Routes
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'homeCtrl'
  })
  .when('/googlebooks/search/:query', {
    templateUrl: 'views/google-books.html',
    controller: 'googleBooksSearchCtrl'
  })
  .when('/googlebooks/:id', {
    templateUrl: 'views/google-book.html',
    controller: 'googleBookCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});

// Controllers
app.controller('homeCtrl', ['$scope', '$location', function ($scope, $location) {
  $scope.searchGoogleBooks = function() {
    var query = $('input').val();
    if (query) {
      window.location = '/#/googlebooks/search/' + query;
    }
  }
}]);

app.controller('googleBooksSearchCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  $scope.query = $routeParams.query;
  $http.get('/api/googlebooks?q=' + $routeParams.query).
  success(function(data, status, headers, config) {
    client.hidePreLoader();
    $scope.data = data.items;
  }).
  error(function(data, status, headers, config) {
    client.hidePreLoader();
    $scope.data = ['An error occured, please refresh the page'];
  });
}]);

app.controller('googleBookCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  $http.get('/api/googlebooks/' + $routeParams.id).
  success(function(data, status, headers, config) {
    client.hidePreLoader();
    $scope.data = data;
  }).
  error(function(data, status, headers, config) {
    client.hidePreLoader();
    $scope.data = ['An error occured, please refresh the page'];
  });
}]);