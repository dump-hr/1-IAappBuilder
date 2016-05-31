(function () {
    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['uiGmapGoogleMapApi', '$scope'];
    function HomeController(uiGmapGoogleMapApi, $scope) {
        var vm = this;

        $scope.map = {
            center: { latitude: 43.5110932, longitude: 16.4717638 },
            zoom: 14,
            options: {
                disableDefaultUI: true,
                scrollwheel: false
            },
            styles: [
{
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [
      {
          "visibility": "on"
      },
      {
          "lightness": 33
      }
    ]
},
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                  {
                      "color": "#f2e5d4"
                  }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                  {
                      "color": "#c5dac6"
                  }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels",
                "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "lightness": 20
                  }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                  {
                      "lightness": 20
                  }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                      "color": "#c5c6c6"
                  }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                  {
                      "color": "#e4d7c6"
                  }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                  {
                      "color": "#fbfaf7"
                  }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                  {
                      "visibility": "on"
                  },
                  {
                      "color": "#acbcc9"
                  }
                ]
            }
            ]
        };

        uiGmapGoogleMapApi.then(function (map) {
            google.maps.event.trigger(map, 'resize');
        });
    }
})();
