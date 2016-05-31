(function(){
    'use strict';
    
    angular.module('app').controller('MapController', MapController);
        
    MapController.$inject = ['uiGmapGoogleMapApi', '$scope'];
    function MapController(uiGmapGoogleMapApi, $scope){
        var vm = this;
        $scope.poruka = 'porurururu';
        $scope.markers = [];
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        uiGmapGoogleMapApi.then(function(map) {
            google.maps.event.trigger(map, 'resize');
        });
       
    }    
})();