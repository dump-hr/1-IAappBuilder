(function () {
    angular.module('airCloudProxy').run(deviceDataEmitter);
    
    deviceDataEmitter.$inject = ['$rootScope', '$interval', '$ionicPlatform', '$cordovaBluetoothSerial'];
    function deviceDataEmitter($rootScope, $interval, $ionicPlatform, $cordovaBluetoothSerial) {
		localStorage['counter'] = angular.toJson(0); 
        $ionicPlatform.ready(function () {
            $cordovaBluetoothSerial.subscribe('\n').then(function () { }, function () { }, function (data) {
                var splittedData = data.split(',');
                var newDataReading = {
                    voc: splittedData[0],
                    co: splittedData[1],
                    temperature: splittedData[2],
                    humidity: splittedData[3]
                }

                $rootScope.$emit('deviceDataEmitter:update', newDataReading);
            });
        });
    }
})();