'use strict';

angular.module('mrclient.profile')
    .service('ProfileService', function ($q, Restangular) {

        function getProfile(profileId) {

            return Restangular.one('profiles/' + profileId).get("");
        }

        function updateProfile(profile) {

            return profile.put();
        }

        return {
            getProfile: getProfile,
            updateProfile: updateProfile
        };
    });