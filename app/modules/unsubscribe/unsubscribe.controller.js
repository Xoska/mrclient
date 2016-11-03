'use strict';

angular.module('mrclient.unsubscribe')
    .controller('UnsubscribeCtrl', function ($rootScope, $scope, $timeout,
                                             toastr, UserModel, HelperService, ProfileService) {

        $scope.unsubscribe = {
            reason: null
        };

        $scope.submit = function() {

            ProfileService.deleteProfile(UserModel.idProfile).then(
                function (response) {

                    $timeout(HelperService.redirectTo(''), 3000);
                }, 
                function(response) {

                    toastr.error('Error while unsubscribing. Please try again later', 'Error');
                });
        };
    });
