'use strict';

angular.module('main').service('RoomService', function($http, $q) {
    this.getPublicRooms = function(){
        var defer = $q.defer();
        $http.get('/api/rooms/type/PUBLIC').success(function(data){
            defer.resolve(data);
        })
        .catch(function(data, status){
            defer.reject(data);
        });
        return defer.promise;
    }
    
    this.createRoom = function(room) {
        var defer = $q.defer();
        $http.post('/api/rooms/', room).success(function(data){
            defer.resolve(data);
        })
        .catch(function(data, status){
            defer.reject(data);
        });
        return defer.promise;
    }
});