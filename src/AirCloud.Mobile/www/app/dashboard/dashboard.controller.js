(function(){
    angular.module('app').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$ionicPlatform', '$rootScope', '$cordovaBluetoothSerial', '$window', 'airQualityStatusService']; 
    function DashboardController($scope, $ionicPlatform, $rootScope, $cordovaBluetoothSerial, $window, airQualityStatusService) {
        var vm = this;
        
        $rootScope.$on('deviceDataEmitter:update', function (event, data) {
            vm.readings = data;
            vm.quality = airQualityStatusService.getStatus(data);
            vm.initialDataLoaded = true;
        });
        
        $scope.$on("$ionicView.enter", function () {  
            $scope.bluetoothDevices = []; 
            
            vm.isOnDevice = !!$window.bluetoothSerial; 
            vm.isConnected = false; 
            vm.isConnecting = false; 
            
            if(vm.isOnDevice) {
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
                        vm.isConnecting = false;
                    }); 
                }
            }
        });
    }
})();