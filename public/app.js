'use strict';

angular.module('charts', ['LocalStorageModule','ui.bootstrap', 
    'ngResource', 'ui.router', 'ngCookies', 'ngCacheBuster'])

    .run(function ($rootScope, $location, $window, $http, $state) {
      
        
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            
        });
		
        $rootScope.$on('$stateChangeSuccess',  function(event, toState, toParams, fromState, fromParams) {
            var titleKey = 'Data Visualization ' ;

            $rootScope.previousStateName = fromState.name;
            $rootScope.previousStateParams = fromParams;

            // Set the page title key to the one configured in state or use default one
            if (toState.data.pageTitle) {
                titleKey = toState.data.pageTitle;
            }
            $window.document.title = titleKey;
        });

        $rootScope.back = function() {
            // If previous state is 'activate' or do not exist go to 'home'
            console.log('state:',$rootScope.previousStateName);
            console.log('stateParams:',$rootScope.previousStateParams);
            if ($rootScope.previousStateName === 'activate' || $state.get($rootScope.previousStateName) === null) {
                $state.go('home');
            } else {
                $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
            }
        };
    })
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider,httpRequestInterceptorCacheBusterProvider) {
		

    	
        $urlRouterProvider.otherwise('/');
        $stateProvider.state('site', {
            'abstract': true,
            views: {
                'navbar@': {
                    templateUrl: 'components/navbar/navbar.html',
                    controller: 'NavbarController'
                }
            },
            resolve: {
              
            }
        });

    
        
    });
