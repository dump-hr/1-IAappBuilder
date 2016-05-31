(function () {
    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['uiGmapGoogleMapApi', '$scope'];
    function HomeController(uiGmapGoogleMapApi, $scope) {
        var vm = this;

        var autocomplete;
        var places; 

        $scope.map = {
            control: {},
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
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        },
                        {
                            "hue": "#0066ff"
                        },
                        {
                            "saturation": 74
                        },
                        {
                            "lightness": 100
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "weight": 0.6
                        },
                        {
                            "saturation": -85
                        },
                        {
                            "lightness": 61
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        },
                        {
                            "color": "#5f94ff"
                        },
                        {
                            "lightness": 26
                        },
                        {
                            "gamma": 5.86
                        }
                    ]
                }
            ]
        };

        uiGmapGoogleMapApi.then(function (map) {
            google.maps.event.trigger(map, 'resize');
            console.log(map); 

            autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('autocomplete')), {
                    types: ['(cities)']
            });

            places = new google.maps.places.PlacesService(map);
            autocomplete.addListener('place_changed', onPlaceChanged);

            function onPlaceChanged() {
                var place = autocomplete.getPlace();
                if (place.geometry) {
                     $scope.map.control.refresh({ latitude: place.geometry.location.lat(), longitude: place.geometry.location.lng() });
                } else {
                    document.getElementById('autocomplete').placeholder = 'Enter a city';
                }
            }
        });
    }
})();
