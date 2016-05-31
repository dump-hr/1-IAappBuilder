(function(){
	'use strict'; 
	
    angular.module('app').config(RouterStateConfig);

    RouterStateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];
    function RouterStateConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $urlRouterProvider.otherwise('/tab/dashboard');
		
		$stateProvider.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'app/common/tabs.template.html'
		});
		
		$ionicConfigProvider.tabs.position('bottom');
    }
})();