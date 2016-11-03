'use strict';

angular.module('mrclient')
    .controller('HeaderCtrl', function ($scope, $state, UserModel, HelperService) {

        $scope.isLoggedIn = function() {

            if (UserModel.isAuthenticated()) {

                $scope.displayName = UserModel.getCurrentUser().username;
                $scope.role = UserModel.getCurrentUser().role;

                return true;
            }
            else {

                $scope.displayName = null;
                $scope.role = null;

                return false;
            }
        };
        
        $scope.isOnPage = function (page) {

            return HelperService.isOnPage(page);
        };


    });