(function () {
    angular.module('app').run(intercomReport);

    intercomReport.$inject = ['$rootScope', '$ionicPlatform', 'env', 'airQualityStatusService'];
    function intercomReport($rootScope, $ionicPlatform, env, airQualityStatusService) {
        if (env.isOnDevice) {
            $ionicPlatform.ready(function () {
                var previousState = null;
                $rootScope.$on('deviceDataEmitter:update', function (event, data) {
                    var quality = airQualityStatusService.getStatus(data);
                    var eventName = {
                        good: 'airquality_good',
                        moderate: 'airquality_moderate',
                        bad: 'airquality_bad',
                    }[quality.overalQuality];
                    intercom.logEvent(eventName, { timestamp: new Date() });
                });
            });
        }
    }
})();