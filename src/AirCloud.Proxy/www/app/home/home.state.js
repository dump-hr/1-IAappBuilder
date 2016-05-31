(function(){
    angular.module('airCloudProxy').config(DashboradStateConfig);

    DashboradStateConfig.$inject = ['$stateProvider']; 
    function DashboradStateConfig($stateProvider) {
        $stateProvider.state('tab.home', {
            url: '/home',
            views: {
                'tab-home': {
                    templateUrl: './app/home/home.template.html',
                    controller: 'HomeController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();