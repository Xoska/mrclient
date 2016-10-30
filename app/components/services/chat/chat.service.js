'use strict';

angular.module('mrclient.search')
    .service('ChatService', function ($q, Restangular) {

        function sendPost(idRoom, post) {

            return Restangular.all('chat/post', idRoom).post(post);
        }

        return {
            sendPost: sendPost
        };
    });