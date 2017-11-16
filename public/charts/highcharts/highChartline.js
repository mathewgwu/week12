'use strict';

angular.module('charts')
    .controller('HighChartLineController', function ($scope,$http) {
      init();
    	function init() {
        serverCall();
      }
    function serverCall() {
        $http.get('/api/highchartline')
          .success(function(data) {
            console.log('coming to the controller:', data);
            $scope.charts = {};
            $scope.charts = data;

            console.log('value of chart data :', $scope.charts);
            callChart();
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      }

    function callChart() {
      var dates = [];
      var close = [];
      $scope.charts.forEach(function(value,key) {
        console.log('value of value :', value);
        dates.push(value.date);
        close.push(value.close);
       });
       console.log('dates: ', dates);
       console.log('close: ', close);
       Highcharts.chart('container', {
            chart: {
                type: 'line'
            },

           series: [{
            name: 'Year',
            data: close
            }],
            title: {
                text: 'Stock data'
            },
            xAxis: {
              categories: dates
            },
            yAxis: {
                title: {
                    text: 'Price'
                }
            }
        });

    }

    });
