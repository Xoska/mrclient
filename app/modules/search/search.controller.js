'use strict';

angular.module('mrclient.search')
    .controller('SearchCtrl', function ($scope, toastr, HelperService,
                                        ChatModalService, SearchService, MeetRouletteService) {

        function _addAnyToList(list, id, name) {

            var anyElement = {};
            anyElement[id] = 0;
            anyElement[name] = 'Any';

            list.unshift(anyElement);

            return list;
        }

        function _initializeCountries() {

            $scope.countries = null;

            MeetRouletteService.getCountries().then(
                function (countries) {

                    $scope.countries = _addAnyToList(countries, 'idCountry', 'name');
                },
                function(response) {

                    $scope.error = "Error while getting the countries.";
                });
        }

        function _initializeStates() {

            MeetRouletteService.getStates($scope.profile.idCountry).then(
                function (states) {

                    $scope.states = _addAnyToList(states, 'idState', 'name');
                },
                function(response) {

                    $scope.error = "Error while getting the states.";
                });
        }

        function _initializeCities() {

            MeetRouletteService.getCities($scope.profile.idState).then(
                function (cities) {

                    $scope.cities = _addAnyToList(cities, 'idCity', 'name');
                },
                function(response) {

                    $scope.error = "Error while getting the cities.";
                });
        }

        function _initializeSexes() {

            $scope.sexes = null;

            MeetRouletteService.getSexes().then(
                function (sexes) {

                    $scope.sexes = _addAnyToList(sexes, 'idSex', 'name');
                },
                function(response) {

                    $scope.error = "Error while getting the sexes.";
                });
        }

        function _initializeGoals() {

            $scope.goals = null;

            MeetRouletteService.getGoals().then(
                function (goals) {

                    $scope.goals = goals;
                },
                function(response) {

                    $scope.error = "Error while getting the goals.";
                });
        }

        function _initialize() {

            $scope.error = '';

            $scope.search = {
                idSex: null,
                idCountry: null,
                idState: null,
                idsCity: [],
                idGoal: null,
                ageMin: null,
                ageMax: null
            };

            $scope.citiesSettings = {
                displayProp: 'name',
                idProp: 'idCity'
            };

            _initializeCountries();
            _initializeSexes();
            _initializeGoals();
        }
        
        $scope.submit = function() {

            $scope.search.idsCity = _.pluck($scope.search.idsCity, 'idCity');

            SearchService.search($scope.search).then(
                function (room) {

                    ChatModalService.open({room: room});
                }, 
                function(response) {

                    toastr.error('Error while searching for a profile', 'Error');
                });
        };

        $scope.updateSelectCountry = function() {

            _initializeStates();
        };

        $scope.updateSelectState = function() {

            _initializeCities();
        };

        _initialize();
    });
