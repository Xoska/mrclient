'use strict';

angular.module('mrclient.login')
    .controller('LoginCtrl', function ($rootScope, $scope, AuthService, UserModel, AUTH_EVENTS) {

        $scope.credentials = {
            username: '',
            password: ''
        };

        $scope.error = '';
        
        $scope.submit = function() {

            AuthService.authenticate($scope.credentials).then(
                function (user) {

                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    UserModel.setCurrentUser(user);
                }, 
                function(response) {

                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
                    $scope.error = "Wrong Credentials.";
                });
        };
    });
