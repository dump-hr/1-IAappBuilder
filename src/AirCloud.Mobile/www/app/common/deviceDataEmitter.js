(function () {
    angular.module('app').run(deviceDataEmitter);
    
    deviceDataEmitter.$inject = ['$rootScope', '$interval'];
    function deviceDataEmitter($rootScope, $interval) {

        var useAndroidDevice = false;
        
        if(useAndroidDevice){
            /* Borisov code za povezivanje sa Arduinom */
        }
        else{
            
            function getNextRandomPercentage() {
                return Math.random() * 100;
            }
            function getNextRandomTemperature(min, max) {
                return Math.random() * (max - min) + min;
                
            }  
            
            var interval = 1000;
            function action() {
                var newDataReading = {
                    voc: getNextRandomPercentage(),
                    co: getNextRandomPercentage(),
                    temperature: getNextRandomTemperature(5, 34),
                    humidity: getNextRandomPercentage()
                }
                
                $rootScope.$emit('deviceDataEmitter:update', newDataReading);
            }
            $interval(action, interval);
        }
    }
})();