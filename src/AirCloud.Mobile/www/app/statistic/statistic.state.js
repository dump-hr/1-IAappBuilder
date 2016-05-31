(function(){
    'use strict';
    
    angular.module('app').config(StatisticStateConfig);
    
    StatisticStateConfig.$inject = ["$stateProvider"];
    function StatisticStateConfig($stateProvider){
       $stateProvider.state('tab.statistic', {
            url: '/statistic',
            views: {
                'tab-statistic': {
                    templateUrl: './app/statistic/statistic.template.html',
                    controller: 'StatisticController',
                    controllerAs: 'vm'
                }
            }
        });    
    }
})();