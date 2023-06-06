var app = angular.module('BookingPortal', []);

app.controller('HeaderController', function ($scope, $http) {
  $http.get('api/header.json').then(function (response) {
    $scope.menuItems = response.data.menu;
  });


});