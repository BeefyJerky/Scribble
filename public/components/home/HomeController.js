'use strict';

angular.module('main').controller('homeCtrl', ['$scope', 'RoomService', '$rootScope', '$location', function($scope, RoomService, $rootScope, $location) {
    $scope.pRooms = [];
    $scope.createRoom = function() {
        if($scope.room) {
            $scope.room.createdBy = $rootScope.userId;
        }
        RoomService.createRoom($scope.room).then(function(room) {
            $location.path('/classroom/' + room.title);
        });
    }
    
    $scope.getPublicRooms = function() {
        RoomService.getPublicRooms().then(function(rooms) {
            $scope.pRooms = rooms;
            $scope.$apply;
        });
    }
    
    $scope.getRoomsByWildCard = function(type, name) {
        RoomService.getRoomsByWildCard().then(function(type, name) {
            $scope.rooms = rooms;
            $scope.$apply;
        })
    }
    
    $scope.getPublicRooms();

}]);