'use strict';

angular.module('mrclient.profile')
    .controller('ProfileCtrl', function ($scope, toastr, ProfileService, AuthService, MeetRouletteService, UserModel) {

        var action = 'createProfile';

        function _initializeProfile() {

            $scope.profile = {
                idProfile: null,
                username: null,
                password: null,
                role: null,
                firstName: null,
                lastName: null,
                email: null,
                zipCode: null,
                idCity: null,
                idState: null,
                idCountry: null,
                idSex: null,
                birthdayDate: null,
                lastModificationDate: null,
                creationDate: null
            };

            var currentUser = UserModel.getCurrentUser();

            if (UserModel.getCurrentUser() != null) {

                ProfileService.getProfile(currentUser.idProfile).then(
                    function (profile) {

                        $scope.profile = profile;
                        profile.password = null;
                        action = 'updateProfile';
                    },
                    function(response) {

                        toastr.error('Error while getting the profile', 'Error');
                    });
            }
        }
        
        function _initializeCountries() {

            $scope.countries = null;

            MeetRouletteService.getCountries().then(
                function (countries) {

                    $scope.countries = countries;
                },
                function(response) {

                    toastr.error('Error while getting the countries', 'Error');
                });
        }

        function _initializeStates() {

            MeetRouletteService.getStates($scope.profile.idCountry).then(
                function (states) {

                    $scope.states = states;
                },
                function(response) {

                    toastr.error('Error while getting the states', 'Error');
                });
        }

        function _initializeCities() {

            MeetRouletteService.getCities($scope.profile.idState).then(
                function (cities) {

                    $scope.cities = cities;
                },
                function(response) {

                    toastr.error('Error while getting the cities', 'Error');
                });
        }

        function _initializeSexes() {

            $scope.sexes = null;

            MeetRouletteService.getSexes().then(
                function (sexes) {

                    $scope.sexes = sexes;
                },
                function(response) {

                    toastr.error('Error while getting the sexes', 'Error');
                });
        }

        function _initialize() {

            $scope.error = '';

            $scope.cities = null;
            $scope.states = null;

            _initializeProfile();
            _initializeCountries();
            _initializeSexes();
        }
        
        $scope.submit = function() {

            ProfileService[action]($scope.profile).then(
                function (profile) {

                    $scope.profile = profile;

                    toastr.success('Profile was submitted successfully', 'Success');
                }, 
                function(response) {

                    var error = 'Error while submitting the profile. ';

                    if (response.data === 'USERNAME_ALREADY_EXIST') {

                        error += "Username already exist";
                    }

                    toastr.error(error, 'Error');
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
