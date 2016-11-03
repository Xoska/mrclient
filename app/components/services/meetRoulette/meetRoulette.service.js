'use strict';

angular.module('services')
    .service('MeetRouletteService', function ($q, Restangular, UserModel, SESSION_STATE) {

        function getCountries() {

            return Restangular.all('geoLocation/countries').getList();
        }

        function getStates(idCountry) {

            var params = {
                id_country: idCountry
            };

            return Restangular.all('geoLocation/states').getList(params);
        }

        function getCities(idState) {

            var params = {
                id_state: idState
            };

            return Restangular.all('geoLocation/cities').getList(params);
        }

        function getSexes() {

            return Restangular.all('profile/sexes').getList();
        }

        function getGoals() {

            return Restangular.all('profile/goals').getList();
        }

        return {
            getCountries: getCountries,
            getStates: getStates,
            getCities: getCities,
            getSexes: getSexes,
            getGoals: getGoals
        };
    });