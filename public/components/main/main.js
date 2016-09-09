'use strict';

var app = angular.module('main', ['ui.router']);

app.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('ResponseHandlerService');


    var isLoggedIn = ['AuthService', function(AuthService){
        return AuthService.isLoggedIn();
    }];
    
    $stateProvider
    .state("home", {
        url: "/",
        template : "<h1>Sup</h1>",
        access : {restricted: false},
        resolve : {
            loggedIn : isLoggedIn
        }
    })
    .state("login", {
        url: "/login",
        templateUrl : "/components/main/templates/login.html",
        access : {restricted: false},
        resolve : {
            loggedIn : isLoggedIn
        }
    })
    .state("register", {
        url: "/register",
        templateUrl : "/components/main/templates/register.html",
        access : {restricted: false},
        resolve : {
            loggedIn : isLoggedIn
        }
    })
    .state("classroom", {
        url: "/classroom/:roomName",
        templateUrl : "/components/chat/chat.html",
        access : {restricted: true},
        resolve : {
            loggedIn : isLoggedIn
        },
    })
    .state("nest", {
        url: "/nest",
        templateUrl : "/components/nest/nest.html",
        access : {restricted: true},
        resolve : {
            loggedIn : isLoggedIn
        }
    });
});

app.run(function($rootScope, $location, $state, AuthService, socket) {
    
    $rootScope.$on('$stateChangeStart', function(event, next, current) {
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