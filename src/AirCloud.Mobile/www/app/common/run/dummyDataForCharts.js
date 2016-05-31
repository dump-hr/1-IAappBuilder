(function(){
    'use strict';
    
    angular.module('app').run(DummyDataFactory);
    
    
    DummyDataFactory.$inject = ['checkIndividualQualityService'];
    function DummyDataFactory(checkIndividualQualityService){
        var isDevOrProduction = "Dev";
        var alwaysDropThenCreate = true;
        
        if(alwaysDropThenCreate || !localStorage["chartDataCO_Overall"] || (isDevOrProduction === "Dev" && angular.fromJson(localStorage["chartDataCO_Overall"]).length < 10080)){
             localStorage["chartDataCO_Overall"] = getDummyDataCO(10080); //7 * 1440
        }
        
        if(alwaysDropThenCreate || !localStorage["chartDataVOC_Overall"] || (isDevOrProduction === "Dev" && angular.fromJson(localStorage["chartDataVOC_Overall"]).length < 10080)){
             localStorage["chartDataVOC_Overall"] = getDummyDataVOC(10080); //7 * 1440
        }

        
        if(alwaysDropThenCreate || !localStorage["chartDataStackedChart"]){
            localStorage["chartDataStackedChart"] = GetByWeekDaysForStackedColumnChart();
            console.log(angular.fromJson(localStorage["chartDataStackedChart"]));
        }
        
        if(alwaysDropThenCreate || !localStorage["chartDataCO_Today"] || localStorage["chartDataCO_Today"] === []){
            var date = new Date();
              var dateAsString = new Date().toLocaleString();
              if(dateAsString.indexOf("AM") >= 0){
                    localStorage["chartDataCO_Today"] = getDummyDataCO(date.getHours() * 60 + date.getMinutes());                
              } else {
                    localStorage["chartDataCO_Today"] = getDummyDataCO(12 * 60 + date.getHours() * 60 + date.getMinutes());                
              }      
        }
        
        if(alwaysDropThenCreate || !localStorage["chartDataVOC_Today"] || localStorage["chartDataVOC_Today"] === []){
            var date = new Date();
              var dateAsString = new Date().toLocaleString();
              if(dateAsString.indexOf("AM") >= 0){
                    localStorage["chartDataVOC_Today"] = getDummyDataCO(date.getHours() * 60 + date.getMinutes());                
              } else {
                    localStorage["chartDataVOC_Today"] = getDummyDataCO(12 * 60 + date.getHours() * 60 + date.getMinutes());                
              }
        }
        
        function getDummyDataCO(n){
            noise.seed(Math.random());
            var dummyData = [];

            for(var i = 0; i < n; i++){
                dummyData.push(Math.abs(Math.abs(noise.simplex2(i / 40, i / 40) * 100) - 22) / 2.896)
            }
            return angular.toJson(dummyData);
        }
        
        function getDummyDataVOC(n){
            noise.seed(Math.random());
            var dummyData = [];

            for(var i = 0; i < n; i++){
                dummyData.push(Math.abs(Math.abs(noise.simplex3(Math.random()*100 / 40, Math.random()*100 / 40, Math.random() * 10) * 100) - 15) / 1.84)
            }
            return angular.toJson(dummyData);
        }
        
        function GetByWeekDaysForStackedColumnChart(){
            var dummyDataCOOverall = angular.fromJson(localStorage["chartDataCO_Overall"]);
            var dummyDataVOCOverall = angular.fromJson(localStorage["chartDataVOC_Overall"]);
            var data = [[],[],[],[],[],[],[]];
            for(var i = 0; i < 7; i++){
                var good = 0;
                var moderate = 0;
                var bad = 0;
                for(var j = i*1440; j < (i+1)*1440; j++){
                    if(checkIndividualQualityService.checkCOAndVOC(dummyDataCOOverall[j], dummyDataVOCOverall[j]) === "good"){
                        good++;
                    } else if(checkIndividualQualityService.checkCOAndVOC(dummyDataCOOverall[j], dummyDataVOCOverall[j]) === "moderate") {
                        moderate++;
                    } else {
                        bad++;
                    }
                }
                data[i].push(good);
                data[i].push(moderate);
                data[i].push(bad);
            } 
            return angular.toJson(data);           
        }      
    }
})();