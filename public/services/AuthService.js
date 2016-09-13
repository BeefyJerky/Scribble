'use strict';

angular.module('main').factory('AuthService', function($http, $q, RoomMembershipService){
    return {
        isLoggedIn : isLoggedIn,
        authorize: authorize,
        register : register,
        login : login,
        logout : logout,
        hasRoomMembership : hasRoomMembership
    };
    
    function authorize(){
        var defer = $q.defer();
        $http.get('/api/users/authorize').success(function(data){
            defer.resolve(data);
        })
        .catch(function(error){
            defer.reject(error);
        });
        
        return defer.promise;
    }
    
    function isLoggedIn(){
        var defer = $q.defer();
        $http.get('/api/users/isLoggedIn').success(function(data){
            defer.resolve(data);
        })
        .catch(function(error){
            defer.reject(error);
        });
        
        return defer.promise;
    }
    
    function register(user){
        var defer = $q.defer();
        $http.post('/api/users/register', user).success(function(data, status) {
            defer.resolve();
        })
        .catch(function(error) {
            defer.reject(error);
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
        .catch(function(error) {
            defer.reject(error);
        });
        
        return defer.promise;
    }
    function hasRoomMembership(userId, roomId){
        var defer = $q.defer();
        RoomMembershipService.hasMembership(userId, roomId).then(function(data) {
            defer.resolve(data);
        }, function(error) {
            defer.reject(error);
        });
        
        return defer.promise;
    }
})