(function () {
    'use strict';

    angular.module('app').config(AppStates);

    AppStates.$inject = ['$stateProvider'];
    function AppStates($stateProvider) {
        $stateProvider.state('Home', {
            url: '/',
<<<<<<< HEAD
            templateUrl: './Scripts/App/landing/landing.template.html'
        }).state('Map', {
            url: '/map',
=======
>>>>>>> parent of 248f6a5... landing page header
            templateUrl: './Scripts/App/home/home.template.html',
            controller: 'homeController',
            controllerAs: 'vm'
        });
    }
})();
