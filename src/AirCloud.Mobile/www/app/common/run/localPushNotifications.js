(function () {
    angular.module('app').run(localPushNotifications);

    localPushNotifications.$inject = ['$rootScope', '$ionicPlatform', '$cordovaLocalNotification', 'env', 'airQualityStatusService'];
    function localPushNotifications($rootScope, $ionicPlatform, $cordovaLocalNotification, env, airQualityStatusService) {
        var getNextId = function () {
           var currentId = 1;
           return function () {
               return currentId++;
           }
       }();
       function pushNotification(title, text) {
           if(true){
            // $cordovaLocalNotification.schedule({
            //         id: getNextId(),
            //         title: title,
            //         text: text
            // });
           }
       }
        
        $ionicPlatform.ready(function () {
            var previousQuality = null;
            $rootScope.$on('deviceDataEmitter:update', function (event, data) {
                var currentQuality = airQualityStatusService.getStatus(data);
                
                if(previousQuality && previousQuality.overalQuality !== currentQuality.overalQuality){
                    pushNotification("Air quality is " + currentQuality.overalQuality, currentQuality.message);
                }
                previousQuality = currentQuality;
            });
        });
    }
})();
