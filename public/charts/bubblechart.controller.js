'use strict';

angular.module('charts')
    .controller('BubbleChartController', function ($scope) {

    	  
    	$scope.charts = {};
		// when landing on the page, get all employees and show them
		$http.get('/api/columnchart')
			.success(function(data) {
				//console.log('coming to the controller:', data);
				$scope.charts = data;
				console.log('value of chart data :', $scope.charts);
				callChart();
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
     	
    });
