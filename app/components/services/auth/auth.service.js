'use strict';

angular.module('services')
    .service('AuthService', function ($location, Restangular, UserModel, HelperService, SESSION_STATE) {

        function authenticate(credentials) {

            return Restangular.all('session/login/').post(credentials);
        }

        function logout(idProfile) {
            
            return Restangular.one('session/logout', idProfile).get();
        }

        return {
            authenticate: authenticate,
            logout: logout
        };
    });