(function () {
    angular.module('airCloudProxy').run(deviceDataEmitter);
    
    deviceDataEmitter.$inject = ['$rootScope', '$interval', '$ionicPlatform', '$cordovaBluetoothSerial'];
    function deviceDataEmitter($rootScope, $interval, $ionicPlatform, $cordovaBluetoothSerial) {
        $ionicPlatform.ready(function () {
            console.log("Usa san"); 
            $cordovaBluetoothSerial.subscribe('\n').then(function () { }, function () { }, function (data) {
                console.log("Subscribe");
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