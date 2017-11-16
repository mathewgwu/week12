(function(){

var progressbars = function($parse) {
	var link = function (scope, el, attr){
        el = el[0]
        var width = 300
        var height = 20
        var svg = d3.select(el).append('svg')
          .attr({width: width, height: height})
          .style('border', '1px solid black');

        // the inner progress bar `<rect>`
        var rect = svg.append('rect').style('fill', 'blue');

        scope.$watch('progress2', function(progress2){
          rect.attr({x: 0, y: 0, width: width * progress2 / 100, height: height });
        })
      }
	
	return {
		link: link,
	    restrict: 'E',
	    scope: { progress2: '=' }

	};
};
angular.module('charts').directive('progressBars', progressbars);
}());