'use strict';

angular.module('mrclient.unsubscribe', [])

    .config(['$routeProvider', 'USER_ROLES', function($routeProvider, USER_ROLES) {
      
        $routeProvider.when('/unsubscribe', {
            templateUrl: 'modules/unsubscribe/unsubscribe.html',
            controller: 'UnsubscribeCtrl',
            data: {
                authorizedRoles: [
                    USER_ROLES.MEMBER,
                    USER_ROLES.PRIVILEGED_MEMBER
                ]
            }
        });
    }]);