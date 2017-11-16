'use strict';

angular.module('charts')
    .controller('ColumnChartController', function ($scope,$http) {

    $scope.charts = {};
    $scope.progressess = [1,100,200,400,1000];
    $scope.progress = 'all';
		// when landing on the page, get all employees and show them
    init();
  	function init() {
      serverCall();
    }


  $scope.$watch('progress',  function (newVal, oldVal){
      if ( newVal !== oldVal ) {
          console.log('coming to watch progress', newVal);
          $scope.charts = {};
          serverCall();
      }
  },true);

  function serverCall() {
    $http.get('/api/columnchart',{ params: {numofcolleges:$scope.progress} })
      .success(function(data) {
        //console.log('coming to the controller:', data);
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

            d3.select("#columnchart").select("svg").remove();

            var margin = {top:30, right:0, bottom:70, left:60},
                width  = 900 - margin.left - margin.right,
                height = 700 - margin.top  - margin.bottom;

            var svg = d3.select("#columnchart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

            var chart = svg.append("g")
                .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
                //when rendered, this will look like <g transform="translate(60, 30)">

            var x = d3.scale.ordinal()
                .rangeRoundBands([0, width], .1); // the range (chart area) we want to place each bar

            var y = d3.scale.linear()
                .range([height, 0]); //the space available in our chart

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");
            var data = $scope.charts;
          /*  d3.csv("collegesByState.csv", convertToNumber, function(error, data){*/

                //optionally sort data
                data.sort(function(a,b){ return b.numcolleges - a.numcolleges; });

                var states = data.map(function(d){ return d.state; });
                var numColleges =  data.map(function(d){return d.numcolleges;});
                //newly created states variable is now an array with values [VA,CA,NJ,NY,MD...]
                //newly created numColleges is now an array with values [632, 544, 506, 439....]

                //set the domains for x and y functions here
                x.domain(states);
                y.domain([0, d3.max(numColleges) ]);

                chart.selectAll(".bar")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x", function(d){ return x(d.state); })
                    .attr("y", function(d){ return y(d.numcolleges); })
                    .attr("width", function(d){ return x.rangeBand(); }) // range band is width of bars
                    .attr("height", function(d){ return height - y(d.numcolleges); })
                    .attr("class", "bar");

                //setting the axes
                svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .call(yAxis);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-65)")
                    .style("text-anchor", "end");

              /*   });*/


    }

    function convertToNumber(d){
        d.numcolleges = +d.numcolleges; //takes d.numcolleges string, converts to number
        return d;
    }

    });
