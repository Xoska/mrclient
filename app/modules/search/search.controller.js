'use strict';

angular.module('mrclient.search')
    .controller('SearchCtrl', function ($scope, toastr, HelperService,
                                        ChatModalService, SearchService, MeetRouletteService, LABELS) {

        function _addLabelToList(list, id, name, label) {

            var anyElement = {};
            anyElement[id] = 0;
            anyElement[name] = label;

            list.unshift(anyElement);

            return list;
        }

        function _initializeCountries() {

            $scope.countries = null;

            MeetRouletteService.getCountries().then(
                function (countries) {

                    $scope.countries = _addLabelToList(countries, 'idCountry', 'name', 'Wherever');
                },
                function(response) {

                    toastr.error('Error while getting the countries', 'Error');
                });
        }

        function _initializeStates(idCountry) {

            MeetRouletteService.getStates(idCountry).then(
                function (states) {

                    $scope.states = _addLabelToList(states, 'idState', 'name', 'Wherever');
                },
                function(response) {

                    toastr.error('Error while getting the states', 'Error');
                });
        }

        function _initializeCities(idState) {

            MeetRouletteService.getCities(idState).then(
                function (cities) {

                    $scope.cities = _addLabelToList(cities, 'idCity', 'name', 'Wherever');
                },
                function(response) {

                    toastr.error('Error while getting the cities', 'Error');
                });
        }

        function _initializeSexes() {

            $scope.sexes = null;

            MeetRouletteService.getSexes().then(
                function (sexes) {

                    $scope.sexes = _addLabelToList(sexes, 'idSex', 'name', 'ANY');
                },
                function(response) {

                    toastr.error('Error while getting the sexes', 'Error');
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

            $scope.search = {
                idSex: null,
                idCountry: null,
                idState: null,
                idsCity: [],
                idGoal: null,
                ageMin: null,
                ageMax: null
            };

            $scope.LABELS = LABELS;

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

        $scope.updateSelectCountry = function(idCountry) {

            $scope.cities = null;
            $scope.states = null;

            if (idCountry !== 0) {

                _initializeStates(idCountry);
            }
        };

        $scope.updateSelectState = function(idState) {

            $scope.cities = null;

            if (idState !== 0) {

                _initializeCities(idState);
            }
        };

        _initialize();
    });
