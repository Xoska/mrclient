'use strict';

angular.module('services')
    .service('HelperService', function ($window, $location) {

        function isOnPage(page) {

            return $window.location.pathname.indexOf(page) === -1;
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

        return {
            isOnPage: isOnPage,
            redirectTo: redirectTo,
            findOccurrencesInArray: findOccurrencesInArray
        };
    });