'use strict';

angular.module('mrclient.searchChat', [])

    .config(['$routeProvider', function($routeProvider) {
      
        $routeProvider.when('/profile', {
            templateUrl: 'modules/searchChat/view/searchChat.html',
            controller: 'SearchChatCtrl'
        });
    }]);