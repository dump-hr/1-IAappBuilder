(function () {
    angular.module('app').constant('apiEndpoints', {
        reading: {
            // getAll_LongDetails: 'http://localhost:50942/api/readings/getAll_longdetails',
            // create:             'http://localhost:50942/api/readings/create'
            getAll_LongDetails: 'http://aircloud.dump.hr/api/readings/getAll_longdetails',
            create:             'http://aircloud.dump.hr/api/readings/create'
        }
    });
})();