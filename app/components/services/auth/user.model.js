'use strict';

angular.module('services')
    .factory('UserModel', function ($cookies, HelperService, USER_ROLES) {

        var currentUser = null;

        function getCurrentUser() {

            return currentUser;
        }

        function setCurrentUser(session) {

            if (!$cookies.getObject('mr-session')) {

                $cookies.putObject('mr-session', session);
            }

            currentUser = session;
        }

        function isAuthenticated() {

            return currentUser && $cookies.getObject('mr-session');
        }

        function isAuthorized(authorizedRoles) {

            return authorizedRoles.indexOf(USER_ROLES.ANONYMOUS) !== -1
                || (isAuthenticated() && authorizedRoles.indexOf(currentUser.role) !== -1);
        }

        function destroyUser() {

            $cookies.remove('mr-session');

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
