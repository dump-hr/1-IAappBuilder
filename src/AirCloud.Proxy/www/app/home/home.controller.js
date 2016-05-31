(function () {
    angular.module('airCloudProxy').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$ionicPlatform', '$rootScope', '$timeout', '$cordovaBluetoothSerial', '$window', 'airQualityStatusService', 'readingsService'];
    function HomeController($scope, $ionicPlatform, $rootScope, $timeout, $cordovaBluetoothSerial, $window, airQualityStatusService, readingsService) {
        var vm = this;

        vm.initialDataLoaded = false;

        $rootScope.$on('deviceDataEmitter:update', function (event, data) {
            vm.reading = data;
            vm.quality = airQualityStatusService.getStatus(data);
            vm.initialDataLoaded = true;
            vm.reading.latitude = 43.513345;
            vm.reading.longitude = 16.4693514;

            readingsService.generateRandomReadings(vm.reading).then(function(readings) {
                _.each(readings, function (reading) {
                    console.log(reading);
                    readingsService.create(reading);
                });
            });
        });

        $scope.$on("$ionicView.enter", function () {
            $scope.bluetoothDevices = [];

            vm.isOnDevice = !!$window.bluetoothSerial;
            vm.isConnected = false;
            vm.isConnecting = false;

            if (vm.isOnDevice) {
                $ionicPlatform.ready(function () {
                    $cordovaBluetoothSerial.list().then(function (devices) {
                        $scope.bluetoothDevices = devices;
                    });
                });

                vm.connect = function (address) {
                    vm.isConnecting = true;
                    $cordovaBluetoothSerial.connect(address).then(function () {
                        vm.isConnected = true;
                    }).finally(function () {
                        vm.isConnecting = false;
                    });
                }
            }
        });
    }
})();