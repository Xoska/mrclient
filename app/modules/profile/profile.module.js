'use strict';

angular.module('mrclient.profile', [])

    .config(['$routeProvider', function($routeProvider) {
      
        $routeProvider.when('/profile', {
            templateUrl: 'modules/profile/view/profile.html',
            controller: 'ProfileCtrl'
        });
    }]);