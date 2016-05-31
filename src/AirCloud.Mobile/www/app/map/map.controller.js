(function(){
    'use strict';
    
    angular.module('app').controller('MapController', MapController);

    MapController.$inject = ['$cordovaNetwork', '$rootScope', 'uiGmapGoogleMapApi', '$scope', 'env'];
    function MapController($cordovaNetwork, $rootScope, uiGmapGoogleMapApi, $scope, env){
      
        $scope.markers = [];
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        
        if(env.isOnDevice){
            $cordovaNetwork.isOffline() ? $scope.internet = false : $scope.internet = true; 
            
            $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
                $scope.internet = true;
                
                uiGmapGoogleMapApi.then(function(map) {
                    google.maps.event.trigger(map, 'resize');
                });
            }); 
            
            $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
                $scope.internet = false; 
            }); 
            
        }
        else
        {
            $scope.internet = true;
            uiGmapGoogleMapApi.then(function(map) {
                google.maps.event.trigger(map, 'resize');
            });
        }
    }    
})();