(function () {
    angular.module('app').run(deviceDataEmitter);
    
    deviceDataEmitter.$inject = ['$rootScope', '$interval'];
    function deviceDataEmitter($rootScope, $interval) {

        var useAndroidDevice = false;
        
        if(useAndroidDevice){
            /* Borisov code za povezivanje sa Arduinom */
        }
        else{
            var interval = 1000;
            function action() {
                $rootScope.$emit('deviceDataEmitter:update', { co: 500 });
            }
            $interval(action, interval);
        }
    }
})();