'use strict';

angular.module('mrclient.login', ['constants'])

    .config(['$routeProvider', 'USER_ROLES', function($routeProvider, USER_ROLES) {
      
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