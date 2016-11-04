'use strict';

angular.module('services')
    .factory('LazyLoadingService', function (MeetRouletteService, toastr) {

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

            return _cloneData(loadedSexes);
        }

        function getGoals() {

            return _cloneData(loadedGoals);
        }

        function getCountries() {

            return _cloneData(loadedCountries);
        }

        function lazyLoadData() {

            if (!loadedSexes) {

                MeetRouletteService.getSexes().then(
                    function (sexes) { loadedSexes = sexes; },
                    _notifyErrorInitialization);
            }

            if (!loadedGoals) {

                MeetRouletteService.getGoals().then(
                    function (goals) { loadedGoals = goals; },
                    _notifyErrorInitialization);
            }

            if (!loadedCountries) {

                MeetRouletteService.getCountries().then(
                    function (countries) { loadedCountries = countries; },
                    _notifyErrorInitialization);
            }
        }

        return {
            getCountries: getCountries,
            getSexes: getSexes,
            getGoals: getGoals,
            lazyLoadData: lazyLoadData
        };
    });