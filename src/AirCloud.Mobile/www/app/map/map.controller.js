(function () {
    'use strict';

    angular.module('app').controller('MapController', MapController);

    MapController.$inject = ['$cordovaNetwork', '$rootScope', 'uiGmapGoogleMapApi', '$scope', 'env'];
    function MapController($cordovaNetwork, $rootScope, uiGmapGoogleMapApi, $scope, env) {

        $scope.markers = [];
        $scope.map = {
            center: { latitude: 37.774546, longitude: -122.433523 },
            zoom: 14,
            options: {
                scrollwheel: false,
                zoomControl: false
            },
            heatLayerCallback: function (layer) {
           
                var pointArray = new google.maps.MVCArray(heatMapData);
                layer.setData(pointArray);
                layer.set('radius', 32);
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