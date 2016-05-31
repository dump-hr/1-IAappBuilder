(function () {
    angular.module('airCloudProxy').service('readingsService', readingsService);

    function readingsService($http, $q, apiEndpoints) {
        return {
            getAll_LongDetails: function () {
                return $http.get(apiEndpoints.reading.getAll_LongDetails).then(function (response) {
                    return response.data;
                });
            },
            create: function (reading) {
                return $http.post(apiEndpoints.reading.create, reading).then(function (response) {
                    return response.data;
                });
            },
            generateRandomLocation: function (initialLocation) {
                var maxDelta = 0.00001;

                var latDirection = [-1, 1][Math.random() < 0.5 ? 0 : 1];
                var latDiff = Math.random() * maxDelta;

                var longDirection = [-1, 1][Math.random() < 0.5 ? 0 : 1];
                var longDiff = Math.random() * maxDelta;

                return {
                    latitude: initialLocation.latitude + latDirection * latDiff,
                    longitude: initialLocation.longitude + longDirection * longDiff
                };
            },
            generateRandomReadingParameters: function (reading) {
                // to be implemented
            },
            generateRandomReadings: function (reading) {
                var deffered = $q.defer();

                var randomizeLocation = this.generateRandomLocation;

                var location = {
                    latitude: reading.latitude,
                    longitude: reading.longitude
                };
                var readings = [];

                var getNextRandomNumberOfReadings = function (min, max) {
                    return Math.random() * (max - min) + min;
                }

                _.range(0, getNextRandomNumberOfReadings(16, 32)).forEach(function () {
                    var randomReading = reading;
                    var randomLocation = randomizeLocation(location);
                    randomReading.latitude = randomLocation.latitude;
                    randomReading.longitude = randomLocation.longitude;
                    readings.push(reading);
                    deffered.resolve(readings);
                });
                return deffered.promise;
            },
            createReadingFromParameters : function(measurements) {
                return {
                    latitude:            measurements.latitude,
                    longitude:           measurements.longitude,
                    vocConcentration:    measurements.voc,
                    coConcentration:     measurements.co,
                    temperature:         measurements.temperature
                };
            }
        };
    }
})();