'use strict';

angular.module('main').factory('AuthService', function($http, $q){
    return {
        isLoggedIn : isLoggedIn,
        register : register,
        login : login,
        logout : logout
    };
    
    function isLoggedIn(){
        var defer = $q.defer();
        $http.get('/api/users/authorize').success(function(data){
            defer.resolve(data);
        })
        .catch(function(data, status){
            defer.reject(data);
        });
        
        return defer.promise;
    }
    function register(user){
        var defer = $q.defer();
        $http.post('/api/users/register', user).success(function(data, status) {
            defer.resolve();
        })
        .catch(function(status) {
            defer.reject();
        });
        
        return defer.promise;
    }
    function login(user){
        var defer = $q.defer();
        $http.post('/api/users/login', user).success(function(data, status) {
            defer.resolve();
        })
        .catch(function(error) {
            defer.reject(error);
        });
        
        return defer.promise;
    }
    function logout(){
        var defer = $q.defer();
        $http.get('/api/users/logout').success(function(status){
            defer.resolve();
        })
        .catch(function(status) {
            defer.reject();
        });
        
        return defer.promise;
    }
})