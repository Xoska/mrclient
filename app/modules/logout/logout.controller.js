'use strict';

angular.module('mrclient.logout')
    .controller('LogoutCtrl', function ($rootScope, $state, HelperService, AuthService, UserModel) {

        AuthService.logout(UserModel.getCurrentUser().idProfile)
            .then(function (data) {

                UserModel.destroyUser();
            }, function(response) {

                UserModel.destroyUser();
            });
    });
