(function () {
  'use strict';

  angular.module('app').controller("StatisticController", StatisticController);

  StatisticController.$inject = ['localStorageService', '$rootScope'];
  function StatisticController(localStorageService, $rootScope) {
    var vm = this;

    var daysAsString = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    vm.labelsFor24HoursCO = ["24 hours ago", "18 hours ago", "12 hours ago", "6 hours ago"];
    vm.seriesFor24HoursCO = ["Carbon Monoxide"];

    function putDataForLast24HoursCO(){
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
    }
    
    vm.dataFor24HoursCO = putDataForLast24HoursCO();

    vm.labelsFor24HoursVOC = ["24 hours ago", "18 hours ago", "12 hours ago", "6 hours ago"];
    vm.seriesFor24HoursVOC = ["VOC"];
    
    function putDataForLast24HoursVOC(){
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
    }
    
    vm.dataFor24HoursVOC = putDataForLast24HoursVOC();
    
    $rootScope.$on('deviceDataEmitter:update', function(event, data){
        vm.dataFor24HoursVOC = putDataForLast24HoursVOC();
        vm.dataFor24HoursCO = putDataForLast24HoursCO()
    })

    vm.labelsForOverallForPieChart = ["Good", "Moderate", "Bad"];
    vm.dataForPieChart = (function putDataForOverallForPieChart() {
      return localStorageService.GetDataOverallGoodModerateBad();
    })();

    vm.chartColors = {
      "colours": [{
        "fillColor": "rgba(129,199,132, 0.85)",
        "strokeColor": "rgba(76,175,80, 1)",
        "pointColor": "#1B5E20",
        "pointStrokeColor": "#FFF",
        "pointHighlightFill": "FFF",
        "pointHighlightStroke": "#FFF"
      }]
    };

    vm.pieChartColors = ["#4CAF50", "#F4511E", "#E53935"];

    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    var twoDaysBefore = new Date();
    twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);
    var threeDaysBefore = new Date();
    threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);
    var fourDaysBefore = new Date();
    fourDaysBefore.setDate(fourDaysBefore.getDate() - 4);
    var fiveDaysBefore = new Date();
    fiveDaysBefore.setDate(fiveDaysBefore.getDate() - 5);
    var sixDaysBefore = new Date();
    sixDaysBefore.setDate(sixDaysBefore.getDate() - 6);
    var sevenDaysBefore = new Date();
    sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);

    var labelsForStackedColumnChart = [];
    labelsForStackedColumnChart.push(getDateAsProperString(yesterday));
    labelsForStackedColumnChart.push(getDateAsProperString(twoDaysBefore));
    labelsForStackedColumnChart.push(getDateAsProperString(threeDaysBefore));
    labelsForStackedColumnChart.push(getDateAsProperString(fourDaysBefore));
    labelsForStackedColumnChart.push(getDateAsProperString(fiveDaysBefore));
    labelsForStackedColumnChart.push(getDateAsProperString(sixDaysBefore));
    labelsForStackedColumnChart.push(getDateAsProperString(sevenDaysBefore));

    var data = angular.fromJson(localStorage["chartDataStackedChart"]);
    vm.highchartsNG = {
      title: {
        text: ''
      },
      xAxis: {
        categories: labelsForStackedColumnChart.reverse()
      },
      yAxis: {
        min: 0,
        max: 25,
        title: {
          text: ''
        },
        stackLabels: {
          enabled: false,
        },
        gridLineDashStyle: 'longdash'
      },
      options: {
        chart: {
          type: 'column',
          backgroundColor: 'transparent'
        },
        colors: [
          '#4CAF50',
          '#F4511E',
          '#E53935'
        ].reverse(),

        backgroundColor: null,

        tooltip: {
          formatter: function () {
            return '<b>' + this.x + '</b><br/>' +
              this.series.name + ': ' + (this.y).toFixed(2) + '<br/>' +
              'Total: ' + this.point.stackTotal;
          }
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: false,
            }
          }
        }
      },
      series: [{
        name: 'Good',
        data: [data[0][0] / 60, data[1][0] / 60, data[2][0] / 60, data[3][0] / 60, data[4][0] / 60, data[5][0] / 60, data[6][0] / 60]
      }, {
        name: 'Moderate',
        data: [data[0][1] / 60, data[1][1] / 60, data[2][1] / 60, data[3][1] / 60, data[4][1] / 60, data[5][1] / 60, data[6][1] / 60]
      }, {
        name: 'Bad',
        data: [data[0][2] / 60, data[1][2] / 60, data[2][2] / 60, data[3][2] / 60, data[4][2] / 60, data[5][2] / 60, data[6][2] / 60]
      }].reverse()
    }


    function getDateAsProperString(date) {
      var dayAsString = daysAsString[date.getDay()];
      return dayAsString;
    }
  }
})();
