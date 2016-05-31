(function(){
    'use strict';
    
    angular.module('app').factory('dataGenerator', DataGenerator);
    
    DataGenerator.$inject = [];
    function DataGenerator(){
        function generateCO(n){
            n = 10080;
            if(n > 10000){
                var test = (Math.random() * 100) % 10 + 15
            } else {
                var test = (Math.random() * 100) % 8 + 8
            }
            
            var allData = [];
            allData.push(growth(n/test, 8));
            var used = false;
            for(var i = 0; i < test - 2; i++){
                var tst = parseInt((Math.random() * 100)) % 2;
                used = false;
                
                if(!used && allData[allData.length - 1] > 35){
                    allData.push(drop(n/test, allData[allData.length - 1][allData[allData.length - 1].length - 1] ));
                    used = true;
                }
                if(!used && allData[allData.length - 1] < 8){
                     allData.push(drop(n/test, allData[allData.length - 1][allData[allData.length - 1].length - 1] ));
                     used = true;
                }
                
                if(!used && tst === 1){
                    allData.push(growth(n/test, allData[allData.length - 1][allData[allData.length - 1].length - 1]));
                } 
                
                if(!used && tst == 0){
                    allData.push(drop(n/test, allData[allData.length - 1][allData[allData.length - 1].length - 1] ));
                }
            }
            // console.log(allData)

            allData.push(growth(n - allData.length * allData[0].length, allData[allData.length - 1][allData[allData.length - 1].length - 1]));
            // console.log(allData)
            var pss = _.flatten(allData);
            console.log(pss);
            
            return pss;
        }
        
        function drop(n, current){
            // console.log(n);
            // console.log(current);
            
            var deviation = [-0.30, -0.25, -0.18, -0.11, -0.06, 0.0, 0.06, 0.1, 0.19, 0.25];
            var data = [];
            var startValue = current;
            
            for(var i = 0; i < n; i++){
                var rnd1 = Math.random();
                var rnd = parseInt(Math.random()*100) % 10;
                // console.log(rnd);
                // console.log(rnd1/100);
                startValue += (deviation[rnd] + rnd1/100);
                // console.log(startValue);
                if(startValue < current - 5){
                    startValue += 2*Math.abs(deviation[rnd]);
                } else if(startValue > current + 5){
                    startValue -= 2*Math.abs(deviation[rnd]);
                }
                data.push(startValue);    
            }
            return data;
        }
        
        function growth(n, current){
            // console.log(n);
            // console.log("started " + current);
            var deviation = [0.30, 0.25, 0.18, 0.11, 0.06, 0.0, -0.06, -0.1, -0.16, -0.24, -0.31];
            var data = [];
            var startValue = current;
            // console.log(n);
            // console.log(current);
            
            for(var i = 0; i < n; i++){
                var rnd1 = Math.random();
                var rnd = parseInt(Math.random()*100) % 11;
                // console.log(rnd);
                startValue += (deviation[rnd] + rnd1/10);
                // console.log(startValue);
                // console.log(startValue)
                if(startValue < current - 5){
                    startValue += 2*Math.abs(deviation[rnd]);
                } else if(startValue > current + 5){
                    startValue -= 2*Math.abs(deviation[rnd]);
                }
                data.push(startValue);           
            }
            return data;
        }
        
        function generateVOC(){

        }
     
        return {
            generateCO  : generateCO,
            generateVOC : generateVOC
        };
    }
})();