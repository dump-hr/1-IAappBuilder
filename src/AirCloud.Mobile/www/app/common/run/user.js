(function () {
    angular.module('app').run(user);

    user.$inject = ['$ionicPlatform', 'userService'];
    function user($ionicPlatform, userService) {
        $ionicPlatform.ready(function () {
           userService.createIfNotExist();
        });
    }
})();