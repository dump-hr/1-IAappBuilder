(function(){
    angular.module('app').constant('airQualityLevels', {
        voc: {
            good:     [0, 20],
            moderate: [20, 60],
            bad:      [60, 100]
        },
        co: {
            good:     [0, 10],
            moderate: [10, 30],
            bad:      [30, 100]
        }
    });
})();

(function(){
    angular.module('app').factory('airQualityStatusService', airQualityStatusService);

    airQualityStatusService.$inject = ['airQualityLevels'];
    function airQualityStatusService(airQualityLevels) {
        
        /* reading je objekt: { voc, co, humidity, temperature }*/
        function getStatus(reading) {
            return {
                overalQuality: get_overalQuality(reading),
                message: get_message(reading)
            }
        }
        function get_message(reading) {
            var voc = quality(reading.voc, airQualityLevels.voc);
            var co = quality(reading.co, airQualityLevels.co);

            if(voc.isGood && co.isGood)
                return 'You are breathing normal, clean air.';
            if(voc.isBad || co.isBad)
                return 'Permanent health damage, loss of consciousness and intoxication is possible with any exposure.';
            if(voc.isModerate && co.isModerate)
                return 'Both permanent and temporary health effects are possible with long-term exposure, go to a better-ventilated area.';
            if(voc.isModerate)
                return 'Inadequate ventilation can cause drowsiness, fatigue, hypersentivity and allergic reactions with long-term exposure.';
            if(co.isModerate)
                return 'Adverse effects on health, such as headaches, diziness or nausea are possible with long-term exposure.';
        }
        function get_overalQuality(reading) {
            var voc = quality(reading.voc, airQualityLevels.voc);
            var co = quality(reading.co, airQualityLevels.co);

            if(voc.isGood && co.isGood)
                return 'good';
            if(voc.isBad || co.isBad)
                return 'bad';
            return 'moderate';
        }

        function quality(parameter, qualityLevels) {
            var isGood = parameter < qualityLevels.good[1];
            var isModerate = parameter >= qualityLevels.moderate[0] && parameter < qualityLevels.moderate[1];
            var isBad = parameter > qualityLevels.bad[0];
            return {
                isGood: isGood,
                isModerate: isModerate,
                isBad: isBad
            }
        }

        return{
            getStatus: getStatus
        }
    }
})();