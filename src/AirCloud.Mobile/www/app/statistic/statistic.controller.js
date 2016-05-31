(function () {
  'use strict';

  angular.module('app').controller("StatisticController", StatisticController);

  StatisticController.$inject = ['localStorageService'];
  function StatisticController(localStorageService) {
    var vm = this;

    var daysAsString = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    vm.labelsFor24HoursCO = ["24 hours ago", "18 hours ago", "12 hours ago", "6 hours ago"];
    vm.seriesFor24HoursCO = ["Carbon Monoxide"];

    vm.dataFor24HoursCO = (function putDataForLast24Hours() {
      var data = localStorageService.GetDataLast24HoursCO();
      var test = [];
      for (var i = 0; i < 1440 / 20; i++) {
        var max = 0;
        for (var j = i * 20; j < (i + 1) * 20; j++) {
          if (data[j] > max) {
            max = data[j];
          }
        }
        test.push(max);
      }
      return [test];
    })()

    vm.labelsFor24HoursVOC = ["24 hours ago", "18 hours ago", "12 hours ago", "6 hours ago"];
    vm.seriesFor24HoursVOC = ["VOC"];

    vm.dataFor24HoursVOC = (function putDataForLast24Hours() {
      var data = localStorageService.GetDataLast24HoursCO();
      var test = [];
      for (var i = 0; i < 1440 / 20; i++) {
        var max = 0;
        for (var j = i * 20; j < (i + 1) * 20; j++) {
          if (data[j] > max) {
            max = data[j];
          }
        }
        test.push(max);
      }
      return [test];
    })()


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
              this.series.name + ': ' + this.y + '<br/>' +
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
        data: [data[0][0], data[1][0], data[2][0], data[3][0], data[4][0], data[5][0], data[6][0]]
      }, {
        name: 'Moderate',
        data: [data[0][1], data[1][1], data[2][1], data[3][1], data[4][1], data[5][1], data[6][1]]
      }, {
        name: 'Bad',
        data: [data[0][2], data[1][2], data[2][2], data[3][2], data[4][2], data[5][2], data[6][2]]
      }].reverse()
    }


    function getDateAsProperString(date) {
      var dayAsString = daysAsString[date.getDay()];
      return dayAsString;
    }
  }
})();
