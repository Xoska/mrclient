'use strict';

angular.module('services')
    .factory('UserModel', function ($cookies, HelperService, USER_ROLES) {

        var currentUser = null;

        function getCurrentUser() {

            return currentUser;
        }

        function setCurrentUser(session) {

            $cookies.put('mr-token', session.name);

            currentUser = session;
        }

        function isAuthenticated() {

            return currentUser && $cookies.get('mr-token');
        }

        function isAuthorized(authorizedRoles) {

            return authorizedRoles.indexOf(USER_ROLES.ANONYMOUS) !== -1
                || (isAuthenticated() && authorizedRoles.indexOf(currentUser.role) !== -1);
        }

        function destroyUser() {

            $cookies.remove('mr-token');

            currentUser = null;

            HelperService.redirectTo('login');
        }

        return {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            destroyUser: destroyUser
        };
    });
