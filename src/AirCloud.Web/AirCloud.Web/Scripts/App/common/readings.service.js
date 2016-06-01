(function () {
    angular.module('app').service('readingsService', readingsService);

    function readingsService($http, $q, apiEndpoints, airQualityLevels, heatmapWeights) {
        return {
            getAll_LongDetails: function (take) {
                if (take) {
                    return $http.get(apiEndpoints.reading.getAll_LongDetails + '?take=' + take)
                     .then(function (response) {
                         return response.data;
                     });
                }
                return $http.get(apiEndpoints.reading.getAll_LongDetails)
                    .then(function (response) {
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
            createReadingFromParameters: function (measurements) {
                return {
                    latitude: measurements.latitude,
                    longitude: measurements.longitude,
                    vocConcentration: measurements.voc,
                    coConcentration: measurements.co,
                    temperature: measurements.temperature
                };
            },
            generateHeatmapObjects:  function(readings) {
                var deffered = $q.defer();
                var heatMapContainer = {
                    voc: [],
                    co: []
                };
                _.each(readings, function(reading) {
                    //vocs
                    if (reading.vocConcentration >= airQualityLevels.voc.good[0] && reading.vocConcentration <= airQualityLevels.voc.good[1]) {
                        heatMapContainer.voc.push({
                            location: new google.maps.LatLng(reading.latitude, reading.longitude),
                            weight : heatmapWeights.good
                        });
                    }
                    if (reading.vocConcentration >= airQualityLevels.voc.moderate[0] && reading.vocConcentration <= airQualityLevels.voc.moderate[1]) {
                        heatMapContainer.voc.push({
                            location: new google.maps.LatLng(reading.latitude, reading.longitude),
                            weight: heatmapWeights.moderate
                        });
                    }
                    if (reading.vocConcentration >= airQualityLevels.voc.bad[0] && reading.vocConcentration <= airQualityLevels.voc.bad[1]) {
                        heatMapContainer.voc.push({
                            location: new google.maps.LatLng(reading.latitude, reading.longitude),
                            weight: heatmapWeights.bad
                        });
                    }
                    //cos
                    if (reading.coConcentration >= airQualityLevels.co.good[0] && reading.coConcentration  <= airQualityLevels.co.good[1]) {
                        heatMapContainer.co.push({
                            location: new google.maps.LatLng(reading.latitude, reading.longitude),
                            weight : heatmapWeights.good
                        });
                    }
                    if (reading.coConcentration >= airQualityLevels.co.moderate[0] && reading.coConcentration <= airQualityLevels.co.moderate[1]) {
                        heatMapContainer.co.push({
                            location: new google.maps.LatLng(reading.latitude, reading.longitude),
                            weight: heatmapWeights.moderate
                        });
                    }
                    if (reading.coConcentration  >= airQualityLevels.co.bad[0] && reading.coConcentration  <= airQualityLevels.co.bad[1]) {
                        heatMapContainer.co.push({
                            location: new google.maps.LatLng(reading.latitude, reading.longitude),
                            weight: heatmapWeights.bad
                        });
                    }
                    deffered.resolve(heatMapContainer);
                });
                
                return deffered.promise;
            }
        };
    }
})();