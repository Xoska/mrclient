'use strict';

angular.module('services')
    .factory('LazyLoadingService', function ($q, MeetRouletteService, toastr) {

        var loadedSexes = null;
        var loadedGoals = null;
        var loadedCountries = null;

        function _notifyErrorInitialization(reponse) {

            return function () {

                toastr.error('Error while initializing the application', 'Error');
            };
        }

        function _cloneData(data) {

            return JSON.parse(JSON.stringify(data));
        }

        function getSexes() {

            var deferred = $q.defer();

            if (loadedSexes) {

                deferred.resolve(_cloneData(loadedSexes));
            }

            MeetRouletteService.getSexes().then(
                function (sexes) {

                    loadedSexes = sexes;
                    deferred.resolve(sexes);
                },
                _notifyErrorInitialization);

            return deferred.promise;
        }

        function getGoals() {

            var deferred = $q.defer();

            if (loadedGoals) {

                deferred.resolve(_cloneData(loadedGoals));
            }

            MeetRouletteService.getGoals().then(
                function (goals) {

                    loadedGoals = goals;
                    deferred.resolve(goals);
                },
                _notifyErrorInitialization);

            return deferred.promise;
        }

        function getCountries() {

            var deferred = $q.defer();

            if (loadedCountries) {

                deferred.resolve(_cloneData(loadedCountries));
            }

            MeetRouletteService.getCountries().then(
                function (countries) {

                    loadedCountries = countries;
                    deferred.resolve(countries);
                },
                _notifyErrorInitialization);

            return deferred.promise;
        }

        return {
            getCountries: getCountries,
            getSexes: getSexes,
            getGoals: getGoals
        };
    });