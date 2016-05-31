(function () {
    'use strict';

    angular.module('app').config(AppConfig);

    AppConfig.$inject = ['$urlRouterProvider', '$httpProvider', '$locationProvider'];
    function AppConfig($urlRouterProvider, $httpProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);

        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.useApplyAsync(true);
    }
})();
