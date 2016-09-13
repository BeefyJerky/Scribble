'use strict';

angular.module('main')
.factory('ResponseHandlerService', function($q){
    var responseInterceptor = {
        responseError: function(error){
            var errorMessage = error.data.slice( 7 ,error.data.indexOf("<br>"));
            alert(errorMessage);
            return $q.reject(error);
        }
    }
    
    return responseInterceptor;
});