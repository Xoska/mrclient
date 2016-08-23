'use strict';

angular.module('mrclient.login', [])

    .config(['$routeProvider', function($routeProvider) {
      
        $routeProvider.when('/login', {
            templateUrl: 'modules/login/view/login.html',
            controller: 'LoginCtrl'
        });
    }]);