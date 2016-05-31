﻿(function () {
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
