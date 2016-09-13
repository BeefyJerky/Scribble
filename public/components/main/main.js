'use strict';

var app = angular.module('main', ['ui.router']);

app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('ResponseHandlerService');

    var authorize = ['AuthService', function(AuthService){
        return AuthService.authorize();
    }];
    
    
    $stateProvider
    .state("home", {
        url: "/",
        template : "<h1>Sup</h1>",
        access : {restricted: false}
    })
    .state("login", {
        url: "/login",
        templateUrl : "/components/main/templates/login.html",
        access : {restricted: false}
    })
    .state("register", {
        url: "/register",
        templateUrl : "/components/main/templates/register.html",
        access : {restricted: false}
    })
    .state("classroom", {
        url: "/classroom/:roomName",
        templateUrl : "/components/chat/chat.html",
        access : {restricted: true},
        resolve : {
            authorize : authorize,
            hasMembbership : ['AuthService', '$stateParams', '$rootScope', function(AuthService, $stateParams, $rootScope) {
                return AuthService.hasRoomMembership($rootScope.userId, $stateParams.roomName);
            }]
        }
    })
    .state("nest", {
        url: "/nest",
        templateUrl : "/components/nest/nest.html",
        access : {restricted: true},
        resolve : {
            authorize : authorize
        }
    });
});

app.run(function($rootScope, $location, $state, AuthService, RoomService, socket) {
    
    $rootScope.$on('$stateChangeStart', function(event, next, toParams, loggedIn) {
        AuthService.isLoggedIn().then(function(userId){
            $rootScope.userId = userId;
            if(!userId && next.access.restricted) {
                $state.go('login');
                $state.reload();

            } else if(userId && !next.access.restricted){
                $state.go('nest');
                $state.reload();
            }
            
        });
    });

});