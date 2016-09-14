'use strict';

angular.module('main').service('RoomService', function($http, $q) {
    this.getPublicRooms = function(){
        var defer = $q.defer();
        $http.get('/api/rooms/type/PUBLIC').success(function(data){
            defer.resolve(data);
        })
        .catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }
    
    this.getByName = function(name){
        var defer = $q.defer();
        $http.get('/api/rooms/name/' + name).success(function(data){
            defer.resolve(data);
        }).catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }
    
    this.createRoom = function(room) {
        var defer = $q.defer();
        $http.post('/api/rooms/', room).success(function(data){
            defer.resolve(data);
        })
        .catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }
    
    this.getRoomsByWildCard = function(type, name) {
        var defer = $q.defer();
        $http.get('/api/rooms/filter/search', {params: {type : type, name : name}})
        .success(function(data) {
            defer.resolve(data);
        })
        .catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }
});