(function () {

    angular.module('airCloudProxy').constant('apiEndpoints', {
        reading: {
            create:             'http://aircloud.dump.hr/api/readings/create'
        }
    });
})();