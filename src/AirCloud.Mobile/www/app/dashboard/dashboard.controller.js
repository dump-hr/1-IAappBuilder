(function(){
    angular.module('app').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$ionicPlatform']; 
    function DashboardController($scope, $ionicPlatform) {
        var vm = this;
        
        $scope.$on("$ionicView.enter", function () {          
            $ionicPlatform.ready(function() {
                
            });
        });
    }
})();