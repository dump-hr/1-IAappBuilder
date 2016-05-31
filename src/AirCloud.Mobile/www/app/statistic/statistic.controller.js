(function(){
    'use strict';
    
    angular.module('app').controller("StatisticController", StatisticController);
    
    StatisticController.$inject = ['localStorageService'];
    function StatisticController(localStorageService){
        var vm = this;   
        
        vm.labelsFor24HoursCO = ["24 hours ago", "18 hours ago", "12 hours ago", "6 hours ago"];
        vm.seriesFor24HoursCO = ["CO"];
        
        vm.dataFor24HoursCO = (function putDataForLast24Hours(){
           var data = localStorageService.GetDataLast24HoursCO();
           var test = [];
           for(var i = 0; i < 1440 / 20; i++){
               var max = 0;
               for(var j = i*20; j < (i+1)*20; j++){
                   if(data[j] > max){
                       max = data[j];
                   }
               }
               test.push(max);               
           }
           return [test];
        })()
        
        
        vm.labelsFor24HoursVOC = ["24 hours ago", "18 hours ago", "12 hours ago", "6 hours ago"];
        vm.seriesFor24HoursVOC = ["VOC"];
        
        vm.dataFor24HoursVOC = (function putDataForLast24Hours(){
           var data = localStorageService.GetDataLast24HoursCO();
           var test = [];
           for(var i = 0; i < 1440 / 20; i++){
               var max = 0;
               for(var j = i*20; j < (i+1)*20; j++){
                   if(data[j] > max){
                       max = data[j];
                   }
               }
               test.push(max);               
           }
           return [test];
        })()
        
        
        
        vm.labelsForOverallForPieChart = ["Good", "Moderate", "Bad"];
        vm.dataForPieChart = (function putDataForOverallForPieChart(){
            return localStorageService.GetDataOverallGoodModerateBad();
        })();
        
        
        
     var data = angular.fromJson(localStorage["chartDataStackedChart"]);   
     vm.highchartsNG = {
                  title: {
              text: 'Last 24 hours'
          },
          xAxis: {
            categories: ['7 days ago', '6 days ago', '5 days ago', '4 days ago', '3 days ago', '2 days ago', '1 day ago']
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Minutes in day'
              },
              stackLabels: {
                  enabled: true,
                  style: {
                      fontWeight: 'bold',
                      color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                  }
              }
          },
          options: {
            chart: {
              type: 'column'
          },
            legend: {
              align: 'right',
              x: -70,
              verticalAlign: 'top',
              y: 20,
              floating: true,
              backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
              borderColor: '#CCC',
              borderWidth: 1,
              shadow: false
          },
          tooltip: {
              formatter: function() {
                  return '<b>'+ this.x +'</b><br/>'+
                      this.series.name +': '+ this.y +'<br/>'+
                      'Total: '+ this.point.stackTotal;
              }
          },
          plotOptions: {
              column: {
                  stacking: 'normal',
                  dataLabels: {
                      enabled: true,
                      color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                      style: {
                          textShadow: '0 0 3px black, 0 0 3px black'
                      }
                  }
              }
          }},
          series: [{
                name: 'Good',
                data: [data[0][0], data[1][0], data[2][0], data[3][0], data[4][0], data[5][0], data[6][0]]
            }, {
                name: 'Moderate',
                data: [data[0][1], data[1][1], data[2][1], data[3][1], data[4][1], data[5][1], data[6][1]]
            }, {
                name: 'Bad',
                data: [data[0][2], data[1][2], data[2][2], data[3][2], data[4][2], data[5][2], data[6][2]]
        }]
    }
    }
})();