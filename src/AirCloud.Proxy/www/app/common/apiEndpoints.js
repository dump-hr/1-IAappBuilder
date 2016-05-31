(function () {

    angular.module('airCloudProxy').constant('apiEndpoints', {
        reading: {
            getAll_LongDetails: 'http://localhost:50942/api/readings/getAll_LongDetails',
            create:             'http://localhost:50942/api/readings/create'
        }
    });
})();