'use strict';

angular.module('services')
    .factory('UserModel', function () {

        var currentUser = null;

        function getCurrentUser () {

            return currentUser;
        }

        function setCurrentUser (user) {

            currentUser = user;
        }

        function isAuthenticated() {

            return !!currentUser.idProfile;
        }

        function isAuthorized(authorizedRoles) {

            if (!angular.isArray(authorizedRoles)) {

                authorizedRoles = [authorizedRoles];
            }

            return (isAuthenticated() && authorizedRoles.indexOf(currentUser.idRole) !== -1);
        }

        function destroyUser() {

            currentUser = null;
        }

        return {
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            destroyUser: destroyUser
        };
    });
