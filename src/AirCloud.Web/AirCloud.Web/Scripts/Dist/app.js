(function () {
    'use strict';

    angular.module('app', ['ui.router', 'uiGmapgoogle-maps']);
})();

(function () {
    'use strict';

    angular.module('app').config(AppConfig).config(HeatmapConfig);

    AppConfig.$inject = ['$urlRouterProvider', '$httpProvider', '$locationProvider'];
    function AppConfig($urlRouterProvider, $httpProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.useApplyAsync(true);
    }

    HeatmapConfig.$inject = ['uiGmapGoogleMapApiProvider'];
    function HeatmapConfig(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyB81UIIhv_kwpUKiSsnclFpjD8xwwdM4F0',
            libraries: 'weather,geometry,visualization'
        });
    }
})();

(function () {
    'use strict';

    angular.module('app').config(AppStates);

    AppStates.$inject = ['$stateProvider'];
    function AppStates($stateProvider) {
        $stateProvider.state('Home', {
            url: '/',
            templateUrl: './Scripts/App/home/home.template.html',
            controller: 'homeController',
            controllerAs: 'vm'
        });
    }
})();

(function () {
    'use strict';

    angular.module('app').controller('homeController', HomeController);

    HomeController.$inject = ['uiGmapGoogleMapApi', '$scope'];
    function HomeController(uiGmapGoogleMapApi, $scope) {
        var vm = this;

        $scope.map = {
            center: { latitude: 43.5110932, longitude: 16.4717638 }, zoom: 14, disableDefaultUI: true,
            options: {
                disableDefaultUI: "true"
            }
            styles: [
                { "featureType": "administrative", "elementType": "all", "stylers": [
                {
                    "visibility": "off"
                }] },
                { "featureType": "landscape", "elementType": "all", "stylers": [{"visibility": "simplified" },
                { "hue": "#0066ff"},
                { "saturation": 74 },
                { "lightness": 100 }]},
                {
                    "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "simplified" }]
                }, { "featureType": "road", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "off" }, { "weight": 0.6 }, { "saturation": -85 }, { "lightness": 61 }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "all", "stylers": [{ "visibility": "on" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "color": "#5f94ff" }, { "lightness": 26 }, { "gamma": 5.86 }] }
            ]
    };

    uiGmapGoogleMapApi.then(function (map) {
        google.maps.event.trigger(map, 'resize');
    });
}
})();
