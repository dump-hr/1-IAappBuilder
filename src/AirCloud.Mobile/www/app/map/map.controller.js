(function () {
    'use strict';

    angular.module('app').controller('MapController', MapController);

    MapController.$inject = ['$cordovaNetwork', '$rootScope', 'uiGmapGoogleMapApi', '$scope', 'env', 'readingsService'];
    function MapController($cordovaNetwork, $rootScope, uiGmapGoogleMapApi, $scope, env, readingsService) {

        $scope.markers = [];
        $scope.map = {
            center: { latitude: 43.5110932, longitude: 16.4717638 },
            zoom: 13,
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
          ],
            options: {
                scrollwheel: true,
                zoomControl: false,
              disableDefaultUI: true
            },
            heatLayerCallback: function (layer) {
                readingsService.getAll_LongDetails(100).then(function (readings) {
                    readingsService.generateHeatmapObjects(readings).then(function(heatMapContainer) {
                        var heatmapDataAsArray = new google.maps.MVCArray(heatMapContainer.voc);
                          console.log(heatMapContainer);
                          layer.setData(heatmapDataAsArray);
                          layer.set('radius', 42);
                    });

                });
            }
        };

        if (env.isOnDevice) {
            $cordovaNetwork.isOffline() ? $scope.internet = false : $scope.internet = true;

            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                $scope.internet = true;

                uiGmapGoogleMapApi.then(function (map) {
                    google.maps.event.trigger(map, 'resize');
                });
            });

            $rootScope.$on('$cordovaNetwork:offline', function (event, networkState) {
                $scope.internet = false;
            });

        }
        else {

            $scope.internet = true;
            uiGmapGoogleMapApi.then(function (map) {
                google.maps.event.trigger(map, 'resize');
            });
        }
    }
})();
