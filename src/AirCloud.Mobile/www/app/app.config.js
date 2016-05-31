(function(){
	'use strict'; 
	
    angular.module('app')
	.config(RouterStateConfig)
	.config(HeatmapConfig);

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
	
	HeatmapConfig.$inject = ['uiGmapGoogleMapApiProvider'];
	function HeatmapConfig(uiGmapGoogleMapApiProvider){
		uiGmapGoogleMapApiProvider.configure({
			key: 'AIzaSyB81UIIhv_kwpUKiSsnclFpjD8xwwdM4F0',
			libraries: 'weather,geometry,visualization'
		});
	}
})();