(function() {
	'use strict'; 
	
	angular.module('airCloudProxy').run(appConfig);
	
	appConfig.$inject = ['$ionicPlatform'];
	function appConfig($ionicPlatform) {
		$ionicPlatform.ready(function($ionicPlatform) {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);

			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	}
})(); 