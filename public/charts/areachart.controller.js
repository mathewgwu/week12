'use strict';

angular.module('charts')
    .controller('AreaChartController', function ($scope,$http,$filter) {
      var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      $scope.charts = {};
      var startD = '01-JAN-08';
      var endD = '12-DEC-12';
      $scope.years = {};
       $scope.stockYears = {
         availableOptions: [
           {id: 'all', name: 'ALL'},
           {id: '2012', name: '2012'},
           {id: '2011', name: '2011'},
           {id: '2010', name: '2010'},
           {id: '2009', name: '2009'}
         ]
               ,
         selectedOption: {id: $scope.years, name: $scope.years} //This sets the default value of the select in the ui
         };


      init();
      function init() {
        $http.get('/api/areachart', { params:{year:'all'} } )
         .success(function(data) {
           //console.log('coming to the controller:', data);
           $scope.charts = data;
           console.log('value of chart data :', JSON.stringify($scope.charts) );
           callChart();
         })
         .error(function(data) {
           console.log('Error: ' + data);
         });

      }

		// when landing on the page, get all employees and show them
    $scope.search = function () {
      console.log('date :', $scope.startDate);
      startD = $filter('date')($scope.startDate,'dd-MMM-yy');
      endD = $filter('date')($scope.endDate,'dd-MMM-yy');
      console.log('START DATE: ', startD);
      console.log('END DATE: ', endD);
      console.log('YEAR : ', $scope.years.id);
      $http.get('/api/areachart', { params:{year:$scope.years.id} } )
       .success(function(data) {
         //console.log('coming to the controller:', data);
         $scope.charts = data;
         console.log('value of chart data :', JSON.stringify($scope.charts) );
         //callChart();
       })
       .error(function(data) {
         console.log('Error: ' + data);
       });

      callChart();
    }

     function callChart() {

       d3.select("#areachart").select("svg").remove();
       var parseDate = d3.time.format("%d-%b-%y").parse;

       var x = d3.time.scale()
           .range([0, width]);

       var y = d3.scale.linear()
           .range([height, 0]);

       var xAxis = d3.svg.axis()
           .scale(x)
           .orient("bottom");

       var yAxis = d3.svg.axis()
           .scale(y)
           .orient("left");


       var area = d3.svg.area()
           .x(function(d) { return x(d.tradeDate); })
           .y0(height)
           .y1(function(d) { return y(d.close); });




       var svg = d3.select("#areachart").append("svg")
           .attr("width", width + margin.left + margin.right)
           .attr("height", height + margin.top + margin.bottom)
           .append("g")
           .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




		/*d3.tsv("stockPriceClose.tsv", function(error, data) {
		  if (error) throw error;*/
		var data = $scope.charts;

		data.forEach(function(d) {
		    d.tradeDate = parseDate(d.tradeDate);
		    d.close = +d.close;
		});

		  x.domain(d3.extent(data, function(d) { return d.tradeDate; }));
		  y.domain([0, d3.max(data, function(d) { return d.close; })]);

		  svg.append("path")
		      .datum(data)
		      .attr("class", "area")
		      .attr("d", area);

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text("Price ($)");
		/*});*/
     	}
    });
