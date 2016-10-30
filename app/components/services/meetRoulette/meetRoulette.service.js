'use strict';

angular.module('services')
    .service('MeetRouletteService', function ($q, Restangular, UserModel, SESSION_STATE) {

        function getCountries() {

            return Restangular.all('geoLocation/countries').get();
        }

        function getStates(idCountry) {

            return Restangular.all('geoLocation/states').get(idCountry);
        }

        function getCities(idState) {

            return Restangular.all('geoLocation/cities').get(idState);
        }

        function getSexes() {

            return Restangular.all('profile/sexes').get();
        }

        function getGoals() {

            return Restangular.all('profile/goals').get();
        }

        return {
            getCountries: getCountries,
            getStates: getStates,
            getCities: getCities,
            getSexes: getSexes,
            getGoals: getGoals
        };
    });