var app = angular.module('BookingPortal', ['ngRoute']);

app.controller('HeaderController', function ($scope, $http) {
    $http.get('https://venkatesh-kcet.github.io/BookingPortal-V/api/header.json').then(function (response) {
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

    var url = 'https://venkatesh-kcet.github.io/BookingPortal-V/api/hotel.json?' + generateUrl($scope.terms) + '&' + generateUrl($scope.review_score) + '&' + generateUrl($scope.star_rate) + '&page=' + $scope.page + '&orderby=' + $scope.orderby + '&location=' + $scope.location + '&date=' + $scope.date + '&room=' + $scope.room + '&adults=' + $scope.adults + '&children=' + $scope.children;

    $http.get(url)
        .then(function(response) {
            $scope.hotels = response.data.hotels;
            $scope.Totalhotels = response.data.total;
            $scope.Ttotalpages = response.data.totalpages;
            $scope.CurrentPage = response.data.page;

            $scope.numbersOfPages = [];

            // Populate the numbers array with values from 1 to 10
            for (var i = 1; i <= $scope.Ttotalpages; i++) {
                $scope.numbersOfPages.push(i);
            }            
        })
        .catch(function(error) {
          console.log('Error retrieving hotels:', error);
        });
    

        
    $scope.HotelSearchFormData = {};
    $scope.HotelSearchFormData.location = "2";
    // $scope.HotelSearchFormData.checkin = "06/07/2023";
    // $scope.HotelSearchFormData.checkout = "06/08/2023";
    $scope.HotelSearchFormData.adults = 1;
    $scope.HotelSearchFormData.children = 0;
    $scope.HotelSearchFormData.room = 1;

    $scope.HotelSearchFormData.price_range_min = "";
    $scope.HotelSearchFormData.price_range_max = "";
    $scope.HotelSearchFormData.price_range_max = "";
    $scope.HotelSearchForm = function() {
        // Access the form data here
        console.log($scope.HotelSearchFormData);
        
        var url = 'https://venkatesh-kcet.github.io/BookingPortal-V/api/hotel.json?page=' + $scope.CurrentPage + '&' + generateUrl($scope.HotelSearchFormData) + '&' + generateUrl($scope.terms) + '&' + generateUrl($scope.review_score) + '&' + generateUrl($scope.star_rate) + '&page=' + $scope.page + '&orderby=' + $scope.orderby + '&location=' + $scope.location + '&date=' + $scope.date + '&room=' + $scope.room + '&adults=' + $scope.adults + '&children=' + $scope.children;

        $http.get(url)
            .then(function(response) {
                $scope.hotels = response.data.hotels;
                $scope.Totalhotels = response.data.total;
                $scope.Ttotalpages = response.data.totalpages;
                $scope.CurrentPage = response.data.page;
    
                $scope.numbersOfPages = [];
    
                // Populate the numbers array with values from 1 to 10
                for (var i = 1; i <= $scope.Ttotalpages; i++) {
                    $scope.numbersOfPages.push(i);
                }
            })
            .catch(function(error) {
                console.log('Error retrieving hotels:', error);
            });
        // You can perform further actions with the data, such as sending it to a server
    };

    $scope.changePage = function(data) {
        // Access the form data here
        $scope.HotelSearchForm();
        console.log(data);
    };


    $http.get('https://venkatesh-kcet.github.io/BookingPortal-V/api/location.json')
    .then(function(response) {
        $scope.locationsList = response.data.locations;
    })
    .catch(function(error) {
      console.log('Error retrieving hotels:', error);
    });

    $http.get('https://venkatesh-kcet.github.io/BookingPortal-V/api/terms.json')
    .then(function(response) {
        $scope.facilities = response.data.facilities;
        $scope.services = response.data.services;
    })
    .catch(function(error) {
      console.log('Error retrieving hotels:', error);
    });
});

  
app.config(function($routeProvider) {
    $routeProvider
        .when('/hotel', {
            templateUrl: 'https://venkatesh-kcet.github.io/BookingPortal-V/api/hotel.html'
        })
        .when('/flight', {
            templateUrl: 'https://venkatesh-kcet.github.io/BookingPortal-V/api/flight.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});