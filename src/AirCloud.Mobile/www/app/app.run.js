(function () {
	'use strict';

	angular.module('app').run(appConfig);

	appConfig.$inject = ['$ionicPlatform', '$rootScope', 'env', 'userService'];
	function appConfig($ionicPlatform, $rootScope, env, userService) {
		$ionicPlatform.ready(function ($ionicPlatform) {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}

			if (env.isOnDevice) {
				intercom.registerIdentifiedUser({ userId: userService.getUser() });
			}
		});

		$rootScope.openIntercomMessagingCenter = function () {
			if (env.isOnDevice) {
				$ionicPlatform.ready(function () {
					intercom.setPreviewPosition(intercom.BOTTOM_RIGHT);
					intercom.displayMessageComposer();
				});
			}
		}
	}
})();
