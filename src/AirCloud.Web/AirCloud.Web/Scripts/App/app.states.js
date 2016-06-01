(function () {
    'use strict';

    angular.module('app').config(AppStates);

    AppStates.$inject = ['$stateProvider'];
    function AppStates($stateProvider) {
        $stateProvider.state('Home', {
            url: '/',
            templateUrl: './Scripts/App/landing/landing.template.html',
            controller: 'homeController',
            controllerAs: 'vm'
        }).state('Map', {
            url: '/map',
            templateUrl: './Scripts/App/home/home.template.html',
            controller: 'homeController',
            controllerAs: 'vm'
        });
    }
})();
