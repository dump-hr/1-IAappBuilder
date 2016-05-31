(function(){
    'use strict';
    
    angular.module('app').constant('qualityLevelLimits', {
        co: {
            good: 10,
            moderate: 30,
        },
        voc: {
            good: 20,
            moderate: 60,
        }
    });
    
})();



(function(){
    'use strict';
    
    angular.module('app').service('checkIndividualQualityService', CheckIndividualQualityService);
    
    CheckIndividualQualityService.$inject = ['qualityLevelLimits'];
    function CheckIndividualQualityService(qualityLevelLimits){
        function checkVOC(n){
            if(n <= qualityLevelLimits.voc.good){
                return "good";
            } else if(n <= qualityLevelLimits.voc.moderate){
                return "moderate";
            } else {
                return "bad";
            }
        }
        
        function checkCO(n){
             if(n <= qualityLevelLimits.co.good){
                return "good";
            } else if(n <= qualityLevelLimits.co.moderate){
                return "moderate";
            } else {
                return "bad";
            }
        }
        
        function checkCOAndVOC(co, voc){
            if(checkCO(co) === "good" && checkVOC(voc)){
                return "good";
            } else if(checkCO(co) === "bad" || checkVOC(voc) === "bad"){
                return "bad";
            } else {
                return "moderate";
            }
        }
        
        
        return {
          checkVOC      : checkVOC,
          checkCO       : checkCO,
          checkCOAndVOC : checkCOAndVOC            
        };
        
    }
})();