(function () {
	'use strict';

	angular.module('app').run(appConfig);

	appConfig.$inject = ['$ionicPlatform', '$rootScope'];
	function appConfig($ionicPlatform, $rootScope) {
		$ionicPlatform.ready(function ($ionicPlatform) {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
			//intercom.registerUnidentifiedUser();
		});

		$rootScope.openIntercomMessagingCenter = function () {
			$ionicPlatform.ready(function () {

				//intercom.setPreviewPosition(intercom.BOTTOM_RIGHT);
				//intercom.displayMessageComposer();
			});
		}
	}
})();
