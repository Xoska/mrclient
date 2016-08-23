'use strict';

angular.module('services')
    .service('AuthService', function ($q, Restangular) {

        function authenticate(credentials) {

            return Restangular.one('authentication/login').get(credentials);
        }

        return {
            authenticate: authenticate
        };
    });