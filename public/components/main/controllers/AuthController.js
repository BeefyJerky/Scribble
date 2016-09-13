'use strict';

angular.module('main')
.controller('loginCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {

    $scope.login = function() {
        AuthService.login($scope.user).then(function(){
            $state.go('nest')
        });
    };

    
}])
.controller('registerCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {

    $scope.register = function() {
       AuthService.register($scope.user).then(function(){
            $state.go('nest')
       });
    };

    
}])
.controller('navCtrl', ['$scope', '$rootScope', '$state', 'AuthService', function($scope, $rootScope, $state, AuthService) {
    $scope.menuClicked = false;
    
    $scope.toggleMenu = function(event){
        $scope.menuClicked = !($scope.menuClicked);
        event.stopPropagation();
    }
    
    window.onclick = function(){
        if($scope.menuClicked){
            $scope.menuClicked = false;
            $scope.$apply();
        }
    }
    $scope.logout = function() {
        AuthService.logout().then(function(){
            $state.go('login');
        });
    }

}]);