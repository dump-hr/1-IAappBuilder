(function(){
    angular.module('app').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$ionicPlatform', '$rootScope', '$cordovaBluetoothSerial', '$window']; 
    function DashboardController($scope, $ionicPlatform, $rootScope, $cordovaBluetoothSerial, $window) {
        var vm = this;
        
        vm.initialDataLoaded = false;
        
        $rootScope.$on('deviceDataEmitter:update', function (event, data) {
            vm.readings = data;
            vm.initialDataLoaded = true;
        });
        
        $scope.$on("$ionicView.enter", function () {  
            $scope.bluetoothDevices = []; 
            
            vm.isOnDevice = !!$window.bluetoothSerial; 
            
            if(vm.isOnDevice) {
                $ionicPlatform.ready(function() {
                    $cordovaBluetoothSerial.list().then(function(devices) {
                        $scope.bluetoothDevices = devices; 
                    }); 
                });
            }
        });
    }
})();