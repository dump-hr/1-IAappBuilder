(function () {
    angular.module('app').run(deviceDataEmitter);

    deviceDataEmitter.$inject = ['$ionicPlatform', 'userService'];
    function deviceDataEmitter($ionicPlatform, userService) {
        $ionicPlatform.ready(function () {
           console.log(userService.getUser());
           userService.createIfNotExist();
           console.log(userService.getUser());
        });
    }
})();