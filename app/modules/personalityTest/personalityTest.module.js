'use strict';

angular.module('mrclient.personalityTest', [])

    .config(['$routeProvider', 'USER_ROLES', function($routeProvider, USER_ROLES) {
      
        $routeProvider.when('/personalityTest', {
            templateUrl: 'modules/personalityTest/personalityTest.html',
            controller: 'PersonalityTestCtrl',
            data: {
                authorizedRoles: [
                    USER_ROLES.MEMBER,
                    USER_ROLES.PRIVILEGED_MEMBER]
            }
        });
    }]);