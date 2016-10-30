'use strict';

angular.module('mrclient.logout', [])

    .config(['$routeProvider', function($routeProvider, USER_ROLES) {
      
        $routeProvider.when('/logout', {
            templateUrl: 'modules/logout/logout.html',
            controller: 'LogoutCtrl',
            data: {
                authorizedRoles: [
                    USER_ROLES.MEMBER,
                    USER_ROLES.PRIVILEGED_MEMBER,
                    USER_ROLES.ADMINISTRATOR
                ]
            }
        });
    }]);