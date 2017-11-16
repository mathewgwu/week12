'use strict';

angular.module('charts')
    .service('DateUtils', function (DAYS) {
    	
    	this.startDate = function(startDate) {
            if(startDate) {
              return new Date(startDate.getFullYear(),startDate.getMonth(),
              startDate.getDate() - DAYS, startDate.getHours(), startDate.getMinutes());
            } else {
            return null;
        }
   
        };
        this.endDate = function(endDate) {
            if(endDate) {
              return new Date(endDate.getFullYear(),endDate.getMonth(),
              endDate.getDate(), endDate.getHours(), endDate.getMinutes());
          } else {
            return null;
          }
   
        };	
  
    });
