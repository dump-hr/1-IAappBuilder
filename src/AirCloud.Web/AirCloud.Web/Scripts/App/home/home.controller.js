(function () {
    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['uiGmapGoogleMapApi', '$scope', '$http', 'readingsService'];
    function HomeController(uiGmapGoogleMapApi, $scope, $http, readingsService) {
        var vm = this;

        var autocomplete;
        var places; 

        vm.dateChanged = function (date) {
            var dateObject = new Date(date);
            dateObject.setHours(dateObject.getHours() + 2);
            
            $scope.$emit('dateData', dateObject); 
        }

        $scope.map = {
            center: { latitude: 43.5110932, longitude: 16.4717638 },
            zoom: 13,
            control: {}, 
            options: {
                disableDefaultUI: true,
                scrollwheel: false,
                zoomControl: false
            },
            heatLayerCallback: function (layer) {
                $scope.$on('dateData', function (event, data) {
                    $http.post('/api/Readings/GetAll_LongDetailsForDate', JSON.stringify(data.toISOString())).then(function (readings) {
                        console.log(readings); 
                        if (readings.data.length === 0)
                        {
                            var heatmapDataAsArray = [];
                            layer.setData(heatmapDataAsArray);
                        }
                        else {
                            readingsService.generateHeatmapObjects(readings.data).then(function (heatMapContainer) {
                                var heatmapDataAsArray = new google.maps.MVCArray(heatMapContainer.voc);
                                layer.setData(heatmapDataAsArray);
                                layer.set('radius', 42);
                            });
                        }

                    });
                }); 
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
