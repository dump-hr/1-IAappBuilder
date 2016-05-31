(function(){
    'use strict';
    
    angular.module('app').service('localStorageService', LocalStorageService);
    
    LocalStorageService.$inject = ['checkIndividualQualityService'];
    function LocalStorageService(checkIndividualQualityService){
        function AddNewThisDay(){
            
        }
        
        function AddLastDayToWeek(){
            
        }
        
        function GetDataLast24HoursCO(){
            var todayData = angular.fromJson(localStorage["chartDataCO_Today"]);
            var overallData = angular.fromJson(localStorage["chartDataCO_Overall"]);

            for(var i = 1440 - todayData.length - 1; i >= 0; i--){
                todayData.unshift(overallData[i]);
            }
            return todayData;
        }
        
        function GetDataLast24HoursVOC(){
            var todayData = angular.fromJson(localStorage["chartDataVOC_Today"]);
            var overallData = angular.fromJson(localStorage["chartDataVOC_Overall"]);
            
            for(var i = 1440 - todayData.length - 1; i >= 0; i--){
                todayData.unshift(overallData[i]);
            }
            return todayData;
        }
        
        
         function GetDataOverallGoodModerateBad(){
            var todayDataCO = angular.fromJson(localStorage["chartDataCO_Today"]);
            var overallDataCO = angular.fromJson(localStorage["chartDataCO_Overall"]);

            
            var todayDataVOC = angular.fromJson(localStorage["chartDataVOC_Today"]);
            var overallDataVOC = angular.fromJson(localStorage["chartDataVOC_Overall"]);

            
            var goodCounter = 0;
            var moderateCounter = 0;
            var badCounter = 0;
            for(var i = 0; i < overallDataCO.length; i++){
                if(checkIndividualQualityService.checkCOAndVOC(overallDataCO[i], overallDataVOC[i]) === "good"){
                    goodCounter++;
                } else if(checkIndividualQualityService.checkCOAndVOC(overallDataCO[i], overallDataVOC[i]) === "moderate"){
                    moderateCounter++;
                } else {
                    badCounter++;
                }
            }
            
            for(var i = 0; i < todayDataCO.length; i++){
                if(checkIndividualQualityService.checkCOAndVOC(todayDataCO[i], todayDataVOC[i]) === "good"){
                    goodCounter++;
                } else if(checkIndividualQualityService.checkCOAndVOC(todayDataCO[i], todayDataVOC[i]) === "moderate"){
                    moderateCounter++;
                } else {
                    badCounter++;
                }
            }
            
            return [goodCounter, moderateCounter, badCounter];
        }
        
        
        return {
          AddNewThisDay                     : AddNewThisDay,
          AddLastDayToWeek                  : AddLastDayToWeek,
          GetDataLast24HoursCO              : GetDataLast24HoursCO,
          GetDataLast24HoursVOC             : GetDataLast24HoursVOC,
          GetDataOverallGoodModerateBad     : GetDataOverallGoodModerateBad  
        };
    }
})();