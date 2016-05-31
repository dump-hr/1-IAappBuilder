(function(){
    'use strict';
    
    angular.module('app').controller('MapController', MapController);

    MapController.$inject = ['$cordovaNetwork', '$rootScope', 'uiGmapGoogleMapApi', '$scope'];
    function MapController($cordovaNetwork, $rootScope, uiGmapGoogleMapApi, $scope){
        var vm = this;
        $scope.poruka = 'porurururu';
        $scope.markers = [];
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        
        $cordovaNetwork.isOffline() ? vm.internet = false : vm.internet = true; 
        
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            vm.internet = true; 
            uiGmapGoogleMapApi.then(function(map) {
                google.maps.event.trigger(map, 'resize');
            });
        }); 
        
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            vm.internet = false; 
        }); 
    }    
})();