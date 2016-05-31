(function(){
    'use strict';
    
    angular.module('app').config(StatisticStateConfig);
    
    StatisticStateConfig.$inject = ["$stateProvider"];
    function StatisticStateConfig($stateProvider){
       $stateProvider.state('tab.map', {
            url: '/map',
            views: {
                'tab-map': {
                    templateUrl: './app/map/map.template.html',
                    controller: 'MapController'
                }
            }
        });    
    }
})();