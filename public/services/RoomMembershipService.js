'use strict';

angular.module('main').service('RoomMembershipService', function($http, $q) {
    this.hasMembership = function(userId, roomId){
        var defer = $q.defer();
        $http.get('/api/roomMemberships/user/' + userId + '/room/' + roomId).success(function(data){
            defer.resolve(data);
        }).catch(function(error){
            defer.reject(error);
        });
        return defer.promise;
    }
});