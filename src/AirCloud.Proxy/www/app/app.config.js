(function(){
	'use strict'; 
	
	angular.module('airCloudProxy').config(RouterStateConfig);

    RouterStateConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];
    function RouterStateConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $urlRouterProvider.otherwise('/tab/home');
		
		$stateProvider.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'app/common/tabs.template.html'
		});
		
		$ionicConfigProvider.tabs.position('bottom');
    }
})();