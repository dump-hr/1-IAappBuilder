(function () {
    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['uiGmapGoogleMapApi', '$scope'];
    function HomeController(uiGmapGoogleMapApi, $scope) {
        var vm = this;

        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

        uiGmapGoogleMapApi.then(function (map) {
            google.maps.event.trigger(map, 'resize');
        });
    }
})();
