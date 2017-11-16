'use strict';

angular.module('charts')
    .config(function ($stateProvider) {
        $stateProvider
            .state('scatterplot', {
                parent: 'site',
                url: '/scatterplot',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'charts/scatterPlotChart.html',
                        controller: 'ScatterPlotController'
                    }
                },
                resolve: {

                }
            })
            .state('columnchart', {
             parent: 'site',
             url: '/columnchart',
             data: {
               roles: []
             },
             views: {
                    'content@': {
                        templateUrl: 'charts/collegesColumnChart.html',
                        controller: 'ColumnChartController'
                    }
                },
                resolve: {

                }
            })

            .state('linechart', {
             parent: 'site',
             url: '/linechart',
             data: {
               roles: []
             },
             views: {
                    'content@': {
                        templateUrl: 'charts/lineChart.html',
                        controller: 'LineChartController'
                    }
                },
                resolve: {

                }
            })

            .state('areachart', {
             parent: 'site',
             url: '/areachart',
             data: {
               roles: []
             },
             views: {
                    'content@': {
                        templateUrl: 'charts/stockPriceAreaChart.html',
                        controller: 'AreaChartController'
                    }
                },
                resolve: {

                }
            })


            .state('linechartyql', {
             parent: 'site',
             url: '/linechartyql',
             data: {
               roles: []
             },
             views: {
                    'content@': {
                        templateUrl: 'charts/lineChartYQL.html',
                        controller: 'MainController'
                    }
                },
                resolve: {

                }
            })

            .state('piechart', {
             parent: 'site',
             url: '/piechart',
             data: {
               roles: []
             },
             views: {
                    'content@': {
                        templateUrl: 'charts/dynamicDonutChart.html',
                        controller: 'MainController'
                    }
                },
                resolve: {

                }
            })

            .state('progressbar', {
             parent: 'site',
             url: '/progressbar',
             data: {
               roles: []
             },
             views: {
                    'content@': {
                        templateUrl: 'charts/dataProgressBar.html',
                        controller: 'MainController'
                    }
                },
                resolve: {

                }
            })

          //High Charts related routes.
          .state('highchart', {
           parent: 'site',
           url: '/highchart',
           data: {
             roles: []
           },
           views: {
                  'content@': {
                      templateUrl: 'charts/highcharts/highChart1.html',
                      controller: 'HighChartController'
                  }
              },
              resolve: {

              }
          })

          .state('highchartline', {
           parent: 'site',
           url: '/highchartline',
           data: {
             roles: []
           },
           views: {
                  'content@': {
                      templateUrl: 'charts/highcharts/highChart2.html',
                      controller: 'HighChartLineController'
                  }
              },
              resolve: {

              }
          })

          .state('highchartarea', {
           parent: 'site',
           url: '/highchartarea',
           data: {
             roles: []
           },
           views: {
                  'content@': {
                      templateUrl: 'charts/highcharts/highChart3.html',
                      controller: 'HighChartAreaController'
                  }
              },
              resolve: {

              }
          })

          ;
    });
