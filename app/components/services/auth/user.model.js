'use strict';

angular.module('services')
    .factory('UserModel', function ($cookieStore, HelperService) {

        var currentUser = null;

        function getCurrentUser() {

            return currentUser;
        }

        function setCurrentUser(session) {

            $cookieStore.put('token', session.name);

            currentUser = session;
        }

        function isAuthenticated() {

            return currentUser.idProfile && $cookieStore.get('token');
        }

        function isAuthorized(authorizedRoles) {
            
            return (isAuthenticated() && authorizedRoles.indexOf(currentUser.role) !== -1);
        }

        function destroyUser() {

            $cookieStore.remove('token');

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
