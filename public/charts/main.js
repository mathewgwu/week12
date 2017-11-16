'use strict';

angular.module('charts')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'charts/main.html',
                        controller: 'MainController'
                    }
                },
                resolve: {
                    
                }
            });
    });
