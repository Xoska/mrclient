'use strict';

angular.module('mrclient.modals')
    .controller('ChatModalCtrl', function ($scope, $modalInstance, ChatService, HelperService,
                                           UserModel, room, toastr, ENVIRONMENT) {

        function _processEvent(post) {

            if ($scope.usernames.length < 2
                && HelperService.findOccurrencesInArray($scope.usernames, post.username) === 0) {

                toastr.success('Someone has joined your room!', 'Information');

                $scope.usernames.push(post.username);
            }

            $scope.posts.push(post);
        }


        function _notifyEvent(event) {

            var post = JSON.parse(event.data);

            _processEvent(post);
        }

        function _initialize() {

            $scope.usernames = [UserModel.username];

            if (room.owner === UserModel.getCurrentUser().username) {

                toastr.info('You were placed in the queue. Wait until we find a good match for you', 'Information');
            }
            else {

                $scope.usernames.push(room.owner);
                toastr.info('Someone is already waiting in the room!', 'Information');
            }

            $scope.posts = [];

            $scope.post = {
                idPost: null,
                idProfile: UserModel.getCurrentUser().idProfile,
                username: UserModel.getCurrentUser().username,
                date: null,
                content: null
            };

            if (typeof (EventSource) !== "undefined") {

                var source = new EventSource(ENVIRONMENT.LOCAL + 'chat/join/' + room.id);

                source.onmessage = _notifyEvent;

                ChatService.sendPost(room.idRoom, $scope.post);
            } else {

                toastr.error('A problem occured while initializing the chat platform', 'Error')
            }
        }

        $scope.cancel = function () {

            $modalInstance.dismiss();
        };

        $scope.submit = function () {

            $scope.post.date = new Date();

            ChatService.sendPost(room.idRoom, $scope.post);

            $scope.post.content = null;
        };

        _initialize();
    });