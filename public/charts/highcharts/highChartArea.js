'use strict';

angular.module('charts')
    .controller('HighChartAreaController', function ($scope,$http) {
      init();
    	function init() {
        serverCall();
      }
    function serverCall() {
        $http.get('/api/highchartarea')
          .success(function(data) {
            console.log('coming to the controller:', data);
            $scope.charts = {};
            $scope.charts = data;

            console.log('value of chart data :', $scope.charts);
            callChart2();
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      }

    function callChart2() {
      var tradeDate = [];
      var close = [];
      $scope.charts.forEach(function(value,key) {
        console.log('value of value :', value);
        tradeDate.push(value.years);
        close.push(value.close);
       });
       console.log('tradeDate: ', tradeDate);
       console.log('close: ', close);
       Highcharts.chart('container', {
            chart: {
                type: 'area'
            },

           series: [{
            name: 'Year of closing',
            data: close
            }],
            title: {
                text: 'Stock Price over the years'
            },
            xAxis: {
              categories: tradeDate
            },
            yAxis: {
                title: {
                    text: 'Price'
                }
            }
        });

    }
    function callChart() {
      // var options = {
      // chart: {
      //     renderTo: 'container',
      //     type: 'bar'
      // },
      // series: [{}]
      // };
      // options.series[0].data = $scope.charts;
      // var chart = new Highcharts.Chart(options);
      //  $('#container').highcharts({
      // var chart = new Highcharts.Chart({
      // chart: {
      //    renderTo: 'container',
      //    type:'bar'
      // },
      // series: [{
      //    data: $scope.charts,
      //    name: 'Random data',
      //    title: {
      //        text: 'Historic World Population by Region'
      //    },
      //    yAxis: {
      //        title: {
      //            text: 'Units'
      //        }
      //    }
      // }]
      // });
      // Highcharts.chart('container', {
      //      chart: {
      //          type: 'bar'
      //      },
      //     // data: {
      //     //      csv: $scope.charts
      //     //  },
      //
      //     series: [{
      //      name: 'Random data',
      //      data: $scope.charts
      //      }],
      //      title: {
      //          text: 'Historic World Population by Region'
      //      },
      //      yAxis: {
      //          title: {
      //              text: 'Units'
      //          }
      //      }
      //  });
    }

    });
