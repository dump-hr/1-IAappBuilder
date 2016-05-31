(function () {

    angular.module('app').constant('apiEndpoints', {
        reading: {
            getAll_LongDetails: 'http://aircloud.dump.hr/api/readings/getAll_longdetails',
            create:             'http://aircloud.dump.hr/api/readings/create'
        }
    });
})();