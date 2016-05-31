(function () {
    'use strict';

    angular.module('app').controller('MapController', MapController);

    MapController.$inject = ['$cordovaNetwork', '$rootScope', 'uiGmapGoogleMapApi', '$scope', 'env'];
    function MapController($cordovaNetwork, $rootScope, uiGmapGoogleMapApi, $scope, env) {

        $scope.markers = [];
        $scope.map = {
            center: { latitude: 37.774546, longitude: -122.433523 },
            zoom: 14,
            options: {scrollwheel: false },
            heatLayerCallback: function (layer) {
                var map, pointarray, heatmap;

                var heatMapData = [
     { location: new google.maps.LatLng(37.782, -122.447), weight: 0.5 },

     { location: new google.maps.LatLng(37.782, -122.443), weight: 0.1 },
     { location: new google.maps.LatLng(37.782, -122.441), weight: 0.2 },
     { location: new google.maps.LatLng(37.782, -122.439), weight: 0.5 },

     { location: new google.maps.LatLng(37.782, -122.435), weight: 0.1 },

     { location: new google.maps.LatLng(37.785, -122.447), weight: 0.5 },
     { location: new google.maps.LatLng(37.785, -122.445), weight: 0.1 },

     { location: new google.maps.LatLng(37.785, -122.441), weight: 0.2 },

     { location: new google.maps.LatLng(37.785, -122.437), weight: 0.3 },
     { location: new google.maps.LatLng(37.785, -122.435), weight: 1 }
                ];
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