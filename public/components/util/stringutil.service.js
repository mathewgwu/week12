
'use strict';

angular.module('charts')
    .service('StringUtils', function () {
    	
    this.spliceFacObject = function(someArray,remF) {
    	 console.log('selected facet array', someArray);
          for (var i =0; i < someArray.length; i++) {
                console.log('someArray[i]', someArray[i].name);
                console.log('REMF', remF);
               if (someArray[i].name === remF) {
                  someArray.splice(i,1);
                  break;
               }
          }
          return someArray;   
    };
    
    this.spliceQueryObject = function(someArray,remF) {
   	 console.log('selected facet array', someArray);
         for (var i =0; i < someArray.length; i++) {
               console.log('someArray[i]', someArray[i].queryId);
               console.log('REMF', remF);
              if (someArray[i].queryId === remF) {
                 someArray.splice(i,1);
                 break;
              }
         }
         return someArray;   
   };

    this.spliceFacItem = function(someArray,remF) {
            console.log('selected facet array', someArray);
            for (var i =0; i < someArray.length; i++) {
                console.log('someArray[i]', someArray[i]);
                console.log('REMF', remF);
               if (someArray[i] === remF.toString()) {
                  someArray.splice(i,1);
                  break;
               }
           }
           return someArray;   
     };
     
     this.convertFacetString = function(selectedFacets) {
 		var seletedFilters = [];
 		var a = '';
 		var key = '';
 		var val = '';
         selectedFacets.forEach(function(value,key) {
         	console.log('value of filter: ', value);
      		a = value.match(/(.*?):(.*)/);
 			key = a[1];
 			val = a[2];
 			var newFilterString = key + '=' + val;
 			seletedFilters.push(newFilterString);
 	    	
         });
         return seletedFilters.toString();
 	};
  
    });
