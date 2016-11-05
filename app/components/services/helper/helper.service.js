'use strict';

angular.module('services')
    .service('HelperService', function ($location) {

        function isOnPage(page) {

            return $location.path().indexOf(page) !== -1;
        }

        function redirectTo(page) {

            if (!isOnPage(page)) {

                $location.path('/' + page);
            }
        }

        function findOccurrencesInArray(array, value) {

            var count = 0;

            for (var i = 0; i < array.length; i++) {

                if (array[i] === value) {

                    count++;
                }
            }

            return count;
        }

        function padZero(number, size) {

            var numberAsString = number + "";

            while (numberAsString.length < size) {

                numberAsString = "0" + numberAsString;
            }

            return numberAsString;
        }

        return {
            isOnPage: isOnPage,
            redirectTo: redirectTo,
            findOccurrencesInArray: findOccurrencesInArray,
            padZero: padZero
        };
    });