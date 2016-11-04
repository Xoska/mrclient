'use strict';

angular.module('mrclient.profile')
    .service('ProfileService', function ($q, Restangular) {

        function getProfile(idProfile) {

            return Restangular.one('profile', idProfile).get();
        }

        function updateProfile(profile) {

            return Restangular.one('profile', profile.idProfile).customPUT(profile);
        }

        function createProfile(profile) {

            return Restangular.all('profile').post(profile);
        }

        function deleteProfile(idProfile) {

            return Restangular.one('profile', idProfile).remove();
        }

        return {
            getProfile: getProfile,
            updateProfile: updateProfile,
            createProfile: createProfile,
            deleteProfile: deleteProfile
        };
    });