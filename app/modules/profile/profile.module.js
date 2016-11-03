'use strict';

angular.module('mrclient.profile', [])

    .config(['$routeProvider', 'USER_ROLES', function($routeProvider, USER_ROLES) {
      
        $routeProvider.when('/profile', {
            templateUrl: 'modules/profile/profile.html',
            controller: 'ProfileCtrl',
            data: {
                authorizedRoles: [
                    USER_ROLES.ANONYMOUS
                ]
            }
        });
    }]);