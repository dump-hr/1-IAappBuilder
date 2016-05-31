(function(){
    angular.module('app').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$ionicPlatform', '$rootScope', 'airQualityStatusService']; 
    function DashboardController($scope, $ionicPlatform, $rootScope, airQualityStatusService) {
        var vm = this;
        
        vm.initialDataLoaded = false;
        
        
        $rootScope.$on('deviceDataEmitter:update', function (event, data) {
            vm.readings = data;
            vm.quality = airQualityStatusService.getStatus(data);
            vm.initialDataLoaded = true;
        });
        $scope.$on("$ionicView.enter", function () {          
            $ionicPlatform.ready(function() {
                
            });
        });
    }
})();