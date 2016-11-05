'use strict';

angular.module('mrclient.search')
    .controller('SearchCtrl', function ($scope, toastr, HelperService, ChatModalService, LazyLoadingService,
                                        SearchService, MeetRouletteService, LABELS, ERRORS_CODE, UserModel) {

        var idProfile = UserModel.getCurrentUser().idProfile;

        function _addLabelToList(list, id, name, label) {

            var anyElement = {};
            anyElement[id] = 0;
            anyElement[name] = label;

            list.unshift(anyElement);

            return list;
        }

        function _initializeCountries() {

            LazyLoadingService.getCountries().then(
                function(countries) {

                    $scope.countries = _addLabelToList(countries, 'idCountry', 'name', 'Wherever');
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

            LazyLoadingService.getSexes().then(
                function(sexes) {

                    $scope.sexes = _addLabelToList(sexes, 'idSex', 'name', 'ANY');
                });
        }

        function _initializeGoals() {

            LazyLoadingService.getGoals().then(
                function(goals) {

                    $scope.goals = goals;
                });
        }

        function _initialize() {

            $scope.search = {
                idSex: 0,
                idCountry: 0,
                idState: 0,
                idsCity: [0],
                idGoal: null,
                ageMin: 16,
                ageMax: 99
            };

            $scope.selectedCities = [{id: 0}];

            $scope.LABELS = LABELS;

            $scope.citiesSettings = {
                displayProp: 'name',
                idProp: 'idCity',
                scrollableHeight: '200px',
                scrollable: true
            };

            _initializeCountries();
            _initializeSexes();
            _initializeGoals();
        }
        
        $scope.submit = function() {

            $scope.search.idsCity = _.pluck($scope.selectedCities, 'id');

            SearchService.search(idProfile, $scope.search).then(
                function (room) {

                    ChatModalService.open({room: room});
                }, 
                function(response) {

                    var error = 'Error while searching for someone. ';

                    if (response.data === ERRORS_CODE.PROFILE_ALREADY_QUEUED) {

                        error += "You are already queued";
                    }

                    toastr.error(error, 'Error');
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
