'use strict';

angular.module('mrclient.search', [])

    .config(['$routeProvider', 'USER_ROLES', function($routeProvider, USER_ROLES) {
      
        $routeProvider.when('/search', {
  //          templateUrl: 'modules/search/search.html',
            controller: 'SearchCtrl',
            data: {
                authorizedRoles: [
                    USER_ROLES.MEMBER,
                    USER_ROLES.PRIVILEGED_MEMBER]
            },
            views: {
                '@': {
                    templateUrl: 'modules/search/search.html',
                    controller: 'SearchCtrl'
                },
                'chat-modal@mrclient.search': {
                    templateUrl: 'modules/modals/chat/chat.modal.html'
                }
            },
        });
    }]);