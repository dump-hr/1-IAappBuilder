(function () {
	'use strict';

	angular.module('app').run(appConfig);

	appConfig.$inject = ['$ionicPlatform', '$rootScope', 'env'];
	function appConfig($ionicPlatform, $rootScope, env) {
		$ionicPlatform.ready(function ($ionicPlatform) {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}

			if(env.isOnDevice) {
				intercom.registerUnidentifiedUser();
			}
		});

		$rootScope.openIntercomMessagingCenter = function () {
			if(env.isOnDevice) {
				$ionicPlatform.ready(function () {
					intercom.setPreviewPosition(intercom.BOTTOM_RIGHT);
					intercom.displayMessageComposer();
				});
			}
		}
	}
})();
