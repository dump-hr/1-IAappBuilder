(function () {
    angular.module('airCloudProxy').service('readingsService', readingsService);

    function readingsService($http, $q, apiEndpoints) {
        return {
            create: function (reading) {
                return $http.post(apiEndpoints.reading.create, reading).then(function (response) {
                    return response.data;
                });
            }
        };
    }
})();