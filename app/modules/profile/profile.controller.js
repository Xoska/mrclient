'use strict';

angular.module('mrclient.profile')
    .controller('ProfileCtrl', function ($scope, toastr, ProfileService, AuthService,
                                         MeetRouletteService, UserModel, ERRORS_CODE, LABELS) {

        function _setProfile(profile) {

            profile.password = null;
            profile.birthdayDate = new Date(profile.birthdayDate);

            $scope.profile = profile;
        }

        function _initializeProfile() {

            var states = {
                create: {
                    title: 'Create Profile',
                    action: 'createProfile'
                },
                update: {
                    title: 'Manage Profile',
                    action: 'updateProfile'
                }
            };

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

            if ($scope.isLoggedIn) {

                $scope.state = states.update;

                ProfileService.getProfile(currentUser.idProfile).then(
                    function(profile) {

                        _setProfile(profile);
                    },
                    function(response) {

                        toastr.error('Error while getting the profile', 'Error');
                    });
            }
            else {

                $scope.state = states.create;
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

        function _initializeStates(idCountry) {

            MeetRouletteService.getStates(idCountry).then(
                function (states) {

                    $scope.states = states;
                },
                function(response) {

                    toastr.error('Error while getting the states', 'Error');
                });
        }

        function _initializeCities(idState) {

            MeetRouletteService.getCities(idState).then(
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

        function _setCurrentDateFormat() {
/*
            function _AddZeroBuffer(number) {

                if (number < 10) {

                    number = '0' + number;
                }

                return number;
            }

            var today = new Date();

            var dd = _AddZeroBuffer(today.getDate());
            var mm = _AddZeroBuffer(today.getMonth() + 1);
            var yyyy = today.getFullYear();
*/
            var actualDate = new Date();
            var minDate = new Date(actualDate.getFullYear() - 16, actualDate.getMonth(), actualDate.getDay());
            var maxDate = new Date(actualDate.getFullYear() - 99, actualDate.getMonth(), actualDate.getDay());

            $scope.maxDate = maxDate.toISOString();
            $scope.minDate = minDate.toISOString();

    //        $scope.maxDate = (yyyy - 16) + '-' + mm + '-' + dd;
     //       $scope.minDate = (yyyy - 99) + '-' + mm + '-' + dd;
        }

        function _initialize() {

            $scope.isLoggedIn = UserModel.isAuthenticated();

            $scope.cities = null;
            $scope.states = null;

            $scope.LABELS = LABELS;

            _setCurrentDateFormat();

            _initializeProfile();
            _initializeCountries();
            _initializeSexes();
        }
        
        $scope.submit = function() {

            ProfileService[$scope.state.action]($scope.profile).then(
                function (profile) {

                    if ($scope.isLoggedIn) {

                        _setProfile(profile);

                        toastr.success('Profile was updated successfully', 'Success');
                    }
                    else {

                        toastr.success('Profile was created successfully', 'Success');

                        _initialize();
                    }
                }, 
                function(response) {

                    var error = 'Error while submitting the profile. ';

                    if (response.data === ERRORS_CODE.USERNAME_ALREADY_EXIST) {

                        error += "Username already exist";
                    }
                    else if (response.data === ERRORS_CODE.PROFILE_INVALID) {

                        error += "Profile is invalid";
                    }

                    toastr.error(error, 'Error');
                });
        };

        $scope.updateSelectCountry = function(idCountry) {

            $scope.cities = null;
            $scope.states = null;

            _initializeStates(idCountry);
        };

        $scope.updateSelectState = function(idState) {

            $scope.cities = null;

            _initializeCities(idState);
        };

        _initialize();
    });
