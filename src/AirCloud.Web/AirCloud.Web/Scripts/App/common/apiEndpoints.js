(function () {
    angular.module('app').constant('apiEndpoints', {
        reading: {
            getAll_LongDetails: 'http://localhost:50942/api/readings/getAll_longdetails',
            create: 'http://localhost:50942/api/readings/create'
        }
    });
})();
