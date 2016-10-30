'use strict';

angular.module('mrclient.login')
    .controller('LoginCtrl', function ($rootScope, $scope, toastr, HelperService, AuthService, UserModel, AUTH_EVENTS) {

        if (UserModel.isAuthenticated()) {

            HelperService.redirectTo('search');
        }

        $scope.credentials = {
            username: null,
            password: null
        };

        $scope.error = '';

        $scope.submit = function() {

            AuthService.authenticate($scope.credentials).then(
                function (session) {

                    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                    UserModel.setCurrentUser(session);

                    HelperService.redirectTo('search');
                }, 
                function(response) {

                    $rootScope.$broadcast(AUTH_EVENTS.loginFailed);

                    var error = "Error while logging in. ";

                    if (response.data === 'INVALID_CREDENTIALS') {

                        error += 'Invalid credentials';
                    }

                    toastr.error(error), 'Error';
                });
        };
    });
