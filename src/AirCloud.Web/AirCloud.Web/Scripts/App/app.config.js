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
            libraries: 'weather,geometry,visualization,places'
        });
    }
})();
