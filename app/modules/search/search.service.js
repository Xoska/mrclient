'use strict';

angular.module('mrclient.search')
    .service('SearchService', function ($q, Restangular) {

        function search(search) {

            return Restangular.all('chat/search').post(search);
        }

        return {
            search: search
        };
    });