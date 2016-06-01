(function () {
    angular.module('app').run(deviceDataEmitter);

    deviceDataEmitter.$inject = ['$rootScope', '$interval', '$cordovaBluetoothSerial', '$ionicPlatform', 'env', 'localStorageService'];
    function deviceDataEmitter($rootScope, $interval, $cordovaBluetoothSerial, $ionicPlatform, env, localStorageService) {
        $ionicPlatform.ready(function () {
            if (env.isArduinoAvailable) {
                $cordovaBluetoothSerial.subscribe('\n').then(function () { }, function () { }, function (data) {
                    var splittedData = data.split(',');
                    var newDataReading = {
                        voc: splittedData[0],
                        co: splittedData[1],
                        temperature: splittedData[2],
                        humidity: splittedData[3]
                    }

                    $rootScope.$emit('deviceDataEmitter:update', newDataReading);
                    localStorageService.AddNewThisDay(newDataReading);                    
                });
            }
            else {
                function getNextRandomPercentage() {
                    return Math.random() * 100;
                }
                function getNextRandomTemperature(min, max) {
                    return Math.random() * (max - min) + min;
                }

                var interval = 1000;
                function action() {
                    var newDataReading = {
                        voc: getNextRandomPercentage(),
                        co: getNextRandomPercentage(),
                        temperature: getNextRandomTemperature(5, 34),
                        humidity: getNextRandomPercentage()
                    }

                    $rootScope.$emit('deviceDataEmitter:update', newDataReading);
                    localStorageService.AddNewThisDay(newDataReading);                    

                }
                $interval(action, interval);
            }
        });
    }
})();