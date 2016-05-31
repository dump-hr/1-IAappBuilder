(function(){
    'use strict';
    
    angular.module('app').controller('MapController', MapController);
        
    MapController.$inject = ['$cordovaNetwork', '$rootScope'];
    function MapController($cordovaNetwork, $rootScope){
        var vm = this;
        
        $cordovaNetwork.isOffline() ? vm.internet = false : vm.internet = true; 
        
        $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            vm.internet = true; 
        }); 
        
        $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            vm.internet = false; 
        }); 
    }    
})();