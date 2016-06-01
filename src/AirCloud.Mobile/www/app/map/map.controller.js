(function () {
    'use strict';

    angular.module('app').controller('MapController', MapController);

    MapController.$inject = ['$cordovaNetwork', '$rootScope', 'uiGmapGoogleMapApi', '$scope', 'env', 'readingsService'];
    function MapController($cordovaNetwork, $rootScope, uiGmapGoogleMapApi, $scope, env, readingsService) {
        var vm = this;
        vm.averageFetched = false;

        $scope.next = {
            mapType: 'CO'
        };

        $scope.markers = [];
        $scope.rawMap = {};
        $scope.mapDidLoad = false;
        $scope.map = {
            center: { latitude: 43.5110932, longitude: 16.4717638 },
            control: {},
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
                $scope.$on('switchMapState', function (state, args) {
                    readingsService.getAll_LongDetails(100)
                      .then(function (readings) {
                          readingsService.generateHeatmapObjects(readings)
                               .then(function (heatMapObject) {
                                   if ($scope.next.mapType === 'CO') {
                                       var heatmapDataAsArray = new google.maps.MVCArray(heatMapObject.co);
                                       layer.setData(heatmapDataAsArray);
                                       layer.set('radius', 42);
                                       $scope.next.mapType = 'VOC';
                                   }
                                   if ($scope.next.mapType === 'VOC') {
                                       var heatmapDataAsArray = new google.maps.MVCArray(heatMapObject.voc);
                                       layer.setData(heatmapDataAsArray);
                                       layer.set('radius', 42);
                                       $scope.next.mapType = 'CO';
                                   }
                               });
                      });
                });
            }
        }

        if (env.isOnDevice) {
            $cordovaNetwork.isOffline() ? $scope.internet = false : $scope.internet = true;

            $rootScope.$on('$cordovaNetwork:online', function (event, networkState) {
                $scope.internet = true;
                loadGlobalAverages();
                uiGmapGoogleMapApi.then(function (map) {
                    google.maps.event.trigger(map, 'resize');
                    $scope.switchMapType = switchMapType;
                    $scope.mapDidLoad = true;
                    $scope.$emit('switchMapState');
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
                $scope.switchMapType = switchMapType;
                $scope.rawMap = map;
                $scope.mapDidLoad = true;
                $scope.$emit('switchMapState');
            });
            loadGlobalAverages();
        }
        switchMapType();

        function loadGlobalAverages() {
            readingsService.getGlobalAverages().then(function (averages) {
                console.log(averages);
                vm.averageFetched = true;
                vm.globalAverages = averages;
                vm.globalAverages.co = vm.globalAverages.co.toFixed(2) * 100;
                vm.globalAverages.voc = vm.globalAverages.voc.toFixed(2) * 100;
            });
        }
        function switchMapType() {
            $scope.$emit('switchMapState');
        }
    }
})();