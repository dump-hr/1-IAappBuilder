(function(){
    angular.module('app').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$ionicPlatform', '$rootScope']; 
    function DashboardController($scope, $ionicPlatform, $rootScope) {
        var vm = this;
        
        vm.initialDataLoaded = false;
        
        $rootScope.$on('deviceDataEmitter:update', function (event, data) {
            vm.readings = data;
            vm.initialDataLoaded = true;
        });
        $scope.$on("$ionicView.enter", function () {          
            $ionicPlatform.ready(function() {
                
            });
        });
    }
})();