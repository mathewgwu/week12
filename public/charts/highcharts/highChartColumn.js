'use strict';

angular.module('charts')
    .controller('HighChartController', function ($scope,$http) {
      init();
    	function init() {
        serverCall();
      }
    function serverCall() {
        $http.get('/api/highchartcolumn')
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
      var state = [];
      var numcolleges = [];
      $scope.charts.forEach(function(value,key) {
        console.log('value of value :', value);
        state.push(value.state);
        numcolleges.push(value.numcolleges);
       });
       console.log('state: ', state);
       console.log('numcolleges: ', numcolleges);
       Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            series: [{
            name: 'States',
            data: numcolleges
            }],
            title: {
                text: 'States with number of colleges'
            },
            xAxis: {
              categories: state
            },
            yAxis: {
                title: {
                    text: 'No of colleges'
                }
            }
        });

    }


    });
