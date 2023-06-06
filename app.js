var app = angular.module('BookingPortal', ['ngRoute']);

app.controller('HeaderController', function ($scope, $http) {
    $http.get('api/header.json').then(function (response) {
        $scope.menuItems = response.data.menu;
        $scope.logoItems = response.data.logo;
        $scope.SiteTitle = response.data.SiteTitle;
    });

    // Added For Future Use
    $scope.currency = "INR";

});

app.controller('HotelController', function($scope, $http) {
    $scope.param = 'asc'; // Set the initial parameter value
    $scope.location = 1;
    $scope.date = '2023-06-07+-+2023-06-08';
    $scope.room = 2;
    $scope.adults = 3;
    $scope.children = 2;
    $scope.page = 1;
    $scope.orderby = "price_low_high";

    $scope.price_range_start = 300;
    $scope.price_range_end = 747;

    $scope.star_rate = {};
    $scope.review_score = {};
    $scope.terms = {};

    function generateUrl(selectedItems) {
        var urlParams = [];

        for (var key in selectedItems) {
            if (selectedItems.hasOwnProperty(key)) {
                urlParams.push(key + '=' + selectedItems[key]);
            }
        }
        return urlParams.join('&')
    };

    var url = 'api/hotel.json?' + generateUrl($scope.terms) + '&' + generateUrl($scope.review_score) + '&' + generateUrl($scope.star_rate) + '&page=' + $scope.page + '&orderby=' + $scope.orderby + '&location=' + $scope.location + '&date=' + $scope.date + '&room=' + $scope.room + '&adults=' + $scope.adults + '&children=' + $scope.children;
      
    $http.get(url)
        .then(function(response) {
          $scope.hotels = response.data;
          $scope.Totalhotels = $scope.hotels.length;
        })
        .catch(function(error) {
          console.log('Error retrieving hotels:', error);
        });
});

  
app.config(function($routeProvider) {
    $routeProvider
        .when('/hotel', {
            templateUrl: 'api/hotel.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});