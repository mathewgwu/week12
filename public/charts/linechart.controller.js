'use strict';

angular.module('charts')
    .controller('LineChartController', function ($scope,$http) {

    	$scope.charts = {};

      $scope.stocks = {};
       $scope.stockSymbols = {
         availableOptions: [
           {id: 'all', name: 'ALL'},
           {id: 'MSFT', name: 'MSFT'},
           {id: 'AAPL', name: 'AAPL'},
           {id: 'IBM', name: 'IBM'},
           {id: 'AMZN', name: 'AMZN'}
         ],
         selectedOption: {id: $scope.stocks, name: $scope.stocks} //This sets the default value of the select in the ui
         };

    init();
    function init() {
           $http.get('/api/linechart', { params:{stockSymbol:'all'} } )
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
    $scope.search = function () {
        $http.get('/api/linechart', { params:{stockSymbol:$scope.stocks.id} } )
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

   	function callChart() {
      d3.select("#linechart").select("svg").remove();
     		// Set the dimensions of the canvas / graph
			var margin = {top: 30, right: 20, bottom: 30, left: 50},
			    width = 600 - margin.left - margin.right,
			    height = 270 - margin.top - margin.bottom;

			// Parse the date / time
			var parseDate = d3.time.format("%b %Y").parse;

			// Set the ranges
			var x = d3.time.scale().range([0, width]);
			var y = d3.scale.linear().range([height, 0]);

			// Define the axes
			var xAxis = d3.svg.axis().scale(x)
			    .orient("bottom").ticks(5);

			var yAxis = d3.svg.axis().scale(y)
			    .orient("left").ticks(5);

			// Define the line
			var priceline = d3.svg.line()
			    .x(function(d) { return x(d.date); })
			    .y(function(d) { return y(d.price); });

			// Adds the svg canvas
			var svg = d3.select("#linechart")
			    .append("svg")
			        .attr("width", width + margin.left + margin.right)
			        .attr("height", height + margin.top + margin.bottom)
			    .append("g")
			        .attr("transform",
			              "translate(" + margin.left + "," + margin.top + ")");

			// Get the data
		/*	d3.csv("stocks.csv", function(error, data) {*/
			var data = $scope.charts;

			    data.forEach(function(d) {
			    d.date = parseDate(d.date);
			    d.price = +d.price;
			    });

			    // Scale the range of the data
			    x.domain(d3.extent(data, function(d) { return d.date; }));
			    y.domain([0, d3.max(data, function(d) { return d.price; })]);

			    // Nest the entries by symbol
			    var dataNest = d3.nest()
			        .key(function(d) {return d.symbol;})
			        .entries(data);

			    var color = d3.scale.category10();  // set the colour scale

			    // Loop through each symbol / key
			    dataNest.forEach(function(d) {

			        svg.append("path")
			            .attr("class", "line")
			            .style("stroke", function() { // Add dynamically
			                return d.color = color(d.key); })
			            .attr("d", priceline(d.values));

			    });

			    // Add the X Axis
			    svg.append("g")
			        .attr("class", "x axis")
			        .attr("transform", "translate(0," + height + ")")
			        .call(xAxis);

			    // Add the Y Axis
			    svg.append("g")
			        .attr("class", "y axis")
			        .call(yAxis);

			/*});*/
     	}
    });
