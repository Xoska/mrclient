'use strict';

angular.module('mrclient.login', [])

    .config(['$routeProvider', function($routeProvider, USER_ROLES) {
      
        $routeProvider.when('/login', {
            templateUrl: 'modules/login/login.html',
            controller: 'LoginCtrl',
            data: {
                authorizedRoles: [
                    USER_ROLES.ANONYMOUS
                ]
            }
        });
    }]);