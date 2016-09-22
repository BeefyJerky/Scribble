'use strict';

angular.module('main')
.controller('chatCtrl', ['$scope', '$rootScope', 'socket', '$stateParams', function($scope, $rootScope, socket, $stateParams){
    $scope.messages = []; 
    $scope.users = [];

    socket.emit('join', {
        userId: $rootScope.userId, 
        room: $stateParams.roomName
    });
    
    socket.on('message', function(msg) {
        $scope.messages.push(msg);
    });
    
    socket.on('join', function(roomData) {
        $scope.messages.concat(roomData.messages);
        $scop.users.concat(roomData.users)
    });
    
    $scope.send = function(){
        console.log($scope.message);
        socket.emit('message', {message: $scope.message});
        $scope.message = "";
    };
}])
.factory('socket', function($rootScope, $stateParams) {
    var socket = io();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                   callback.apply(socket, args); 
                });
            });
        },
        
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback){
                        callback.apply(socket, args);
                    }
                });
            });
        }
    } 
});