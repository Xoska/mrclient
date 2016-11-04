'use strict';

angular.module('mrclient.search')
    .service('SearchService', function ($q, Restangular) {

        function search(idProfile, search) {

            return Restangular.all('chat/search/' + idProfile).post(search);
        }

        return {
            search: search
        };
    });