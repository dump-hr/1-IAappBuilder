(function(){
    angular.module('app').config(DashboradStateConfig);

    DashboradStateConfig.$inject = ['$stateProvider']; 
    function DashboradStateConfig($stateProvider) {
        $stateProvider.state('tab.dashboard', {
            url: '/dashboard',
            views: {
                'tab-dashboard': {
                    templateUrl: './app/dashboard/dashboard.template.html',
                    controller: 'DashboardController',
                    controllerAs: 'vm', 
                    cache: false
                }
            }
        });
    }
})();