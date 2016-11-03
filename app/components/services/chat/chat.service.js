'use strict';

angular.module('services')
    .service('ChatService', function ($q, Restangular) {

        function sendPost(idRoom, post) {

            return Restangular.all('chat/post', idRoom).post(post);
        }

        function leaveRoom(idRoom) {

            return Restangular.all('chat/leave', idRoom).get();
        }

        return {
            sendPost: sendPost,
            leaveRoom: leaveRoom
        };
    });