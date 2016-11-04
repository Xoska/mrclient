'use strict';

angular.module('mrclient.unsubscribe')
    .controller('UnsubscribeCtrl', function ($rootScope, $scope, $timeout,
                                             toastr, UserModel, HelperService, ProfileService) {

        $scope.unsubscribe = {
            reason: null
        };

        $scope.submit = function() {

            ProfileService.deleteProfile(UserModel.getCurrentUser().idProfile).then(
                function (response) {

                    UserModel.destroyUser();
                }, 
                function(response) {

                    toastr.error('Error while unsubscribing. Please try again later', 'Error');
                });
        };
    });
