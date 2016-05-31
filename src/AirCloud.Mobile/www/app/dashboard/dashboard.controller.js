(function(){
    angular.module('app').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$ionicPlatform', '$rootScope', '$cordovaBluetoothSerial', '$window', 'airQualityStatusService', '$timeout', 'env', '$cordovaLocalNotification', '$rootScope', '$ionicSideMenuDelegate'];
    function DashboardController($scope, $ionicPlatform, $rootScope, $cordovaBluetoothSerial, $window, airQualityStatusService, $timeout, env, $cordovaLocalNotification, $rootScope, $ionicSideMenuDelegate) {
        var vm = this;

        vm.initialDataLoaded = false;

        $rootScope.$on('deviceDataEmitter:update', function (event, data) {
            vm.readings = data;
            vm.quality = airQualityStatusService.getStatus(data);
            vm.initialDataLoaded = true;
        });

        $scope.bluetoothDevices = [];

        vm.isArduinoAvailable = env.isArduinoAvailable;

        vm.isConnected = false;
        vm.isConnecting = false;

        if(vm.isArduinoAvailable) {
            $ionicPlatform.ready(function() {
                $cordovaBluetoothSerial.list().then(function(devices) {
                    $scope.bluetoothDevices = devices;
                });
            });

            vm.connect = function(address) {
                vm.isConnecting = true;

                $cordovaBluetoothSerial.connect(address).then(function() {
                    vm.isConnected = true;
                }).finally(function() {
                    $timeout(function() {
                        vm.isConnecting = false;
                    }, 500);
                });
            }
        }
    }
})();
