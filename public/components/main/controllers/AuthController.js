'use strict';

angular.module('main')
.controller('loginCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {

    $scope.login = function() {
        AuthService.login($scope.user).then(function(){
            $location.path('/nest')
        });
    };

    
}])
.controller('registerCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {

    $scope.register = function() {
       AuthService.register($scope.user).then(function(){
            $location.path('/nest')
       });
    };

    
}])
.controller('navCtrl', ['$scope', '$rootScope', '$location', 'AuthService', function($scope, $rootScope, $location, AuthService) {
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
            $location.path('/login');
        });
    }

}]);