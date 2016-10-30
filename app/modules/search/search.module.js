'use strict';

angular.module('mrclient.search', [])

    .config(['$routeProvider', function($routeProvider, USER_ROLES) {
      
        $routeProvider.when('/search', {
            templateUrl: 'modules/search/search.html',
            controller: 'SearchCtrl',
            data: {
                authorizedRoles: [USER_ROLES.MEMBER, USER_ROLES.PRIVILEGED_MEMBER]
            }
        });
    }]);