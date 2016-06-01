(function () {
    angular.module('airCloudProxy').controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$ionicPlatform', '$rootScope', '$timeout', '$cordovaBluetoothSerial', '$window', 'readingsService', '$cordovaGeolocation'];
    function HomeController($scope, $ionicPlatform, $rootScope, $timeout, $cordovaBluetoothSerial, $window, readingsService, $cordovaGeolocation) {
        var vm = this;
        
        var posOptions = {timeout: 10000, enableHighAccuracy: false};

        $rootScope.$on('deviceDataEmitter:update', function (event, data) {
            $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
                var reading = data;
                console.log("Event"); 
				reading.latitude = position.coords.latitude; 
                reading.longitude = position.coords.longitude;
                
				var counter = angular.fromJson(localStorage["counter"]); 
				if(counter == 18)
				{
                    console.log("POSLA SAM");
					readingsService.create(reading);
					counter = 0; 
				} else {
					counter++; 
				}
				
				localStorage["counter"] = angular.toJson(counter);      
            });
        });

        $scope.$on("$ionicView.enter", function () {
            $scope.bluetoothDevices = [];

            $ionicPlatform.ready(function () {
                $cordovaBluetoothSerial.list().then(function (devices) {
                    $scope.bluetoothDevices = devices;
                });
            });

            vm.connect = function (address) {
                vm.isConnecting = true;
                console.log("Spajam se.");
                $cordovaBluetoothSerial.connect(address).then(function () {
                    console.log("Spojen");
                    vm.isConnected = true;
                }).finally(function () {
                    vm.isConnecting = false;
                });
            }
        });
    }
})();