(function () {
    angular.module('app').run(intercomReport);

    intercomReport.$inject = ['$rootScope', '$ionicPlatform', 'env', 'airQualityStatusService'];
    function intercomReport($rootScope, $ionicPlatform, env, airQualityStatusService) {
        if (env.isOnDevice) {
            $ionicPlatform.ready(function () {
                var previousOveralQuality = null;
                $rootScope.$on('deviceDataEmitter:update', function (event, data) {
                    var quality = airQualityStatusService.getStatus(data);
                    
                     if(previousOveralQuality !== quality.overalQuality){
                        var eventName = {
                            good:     'airquality_good',
                            moderate: 'airquality_moderate',
                            bad:      'airquality_bad',
                        }[quality.overalQuality];
                        intercom.logEvent(eventName, { timestamp: new Date() });
                        previousOveralQuality = quality.overalQuality;
                    }
                });
            });
        }
    }
})();