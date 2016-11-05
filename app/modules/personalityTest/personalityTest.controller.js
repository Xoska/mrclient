'use strict';

angular.module('mrclient.personalityTest')
    .controller('PersonalityTestCtrl', function ($scope, toastr, PersonalityTestService, LABELS) {

        function _initialize() {

            $scope.isDisabled = false;

            $scope.personalityTest = {
                question1: 5,
                question2: 5,
                question3: 5,
                question4: 5,
                question5: 5,
                question6: 5,
                question7: 5,
                question8: 5,
                question9: 5,
                question10: 5
            };
        }
        
        $scope.submit = function() {

            toastr.success('Personality was saved successfully', 'Success');

            $scope.isDisabled = true;
        };

        _initialize();
    });
