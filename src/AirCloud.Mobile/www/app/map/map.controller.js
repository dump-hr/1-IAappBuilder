(function () {
    'use strict';

    angular.module('app').controller('MapController', MapController);

    MapController.$inject = ['$cordovaNetwork', '$rootScope', 'uiGmapGoogleMapApi', '$scope', 'env', 'readingsService'];
    function MapController($cordovaNetwork, $rootScope, uiGmapGoogleMapApi, $scope, env, readingsService) {

        $scope.markers = [];
        $scope.map = {
            center: { latitude: 43.510162, longitude: 16.4374519 },
            zoom: 13,
            options: {
                scrollwheel: true,
                zoomControl: false
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