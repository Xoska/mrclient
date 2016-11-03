'use strict';

angular.module('mrclient.modals')
    .controller('ChatModalCtrl', function ($scope, $uibModalInstance, ChatService, HelperService,
                                           UserModel, room, toastr, ENVIRONMENT, TYPE_POST) {

        var source = null;

        function _getTimeFormat() {

            var time = new Date();

            return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        }

        function _processEvent(post) {
            
            post.time = _getTimeFormat();

            if (post.typePost === TYPE_POST.MESSAGE) {

                post.content = ': ' + post.content;

                $scope.posts.push(post);
            }
            else if (post.typePost === TYPE_POST.NOTIFICATION_ENTER_ROOM) {

                post.content = ' has joined your room!';

                toastr.success(post.username + post.content, 'Information');

                $scope.usernames.push(post.username);
                $scope.posts.push(post);
            }
            else if (post.typePost === TYPE_POST.NOTIFICATION_LEAVE_ROOM) {

                post.content = ' just left the room';

                toastr.info(post.username + post.content, 'Information');

                $scope.posts.push(post);
            }
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
                content: null,
                typePost: TYPE_POST.NOTIFICATION_ENTER_ROOM
            };

            if (typeof (EventSource) !== "undefined") {

                source = new EventSource(ENVIRONMENT.LOCAL + 'chat/join/' + room.id);

                source.onmessage = _notifyEvent;

                ChatService.sendPost(room.idRoom, $scope.post);
            } else {

                toastr.error('A problem occured while initializing the chat platform', 'Error')
            }
        }

        $scope.leave = function () {

            $scope.post.typePost = TYPE_POST.NOTIFICATION_LEAVE_ROOM;
            ChatService.sendPost(room.idRoom, $scope.post);

            if (source) {

                source.close();
            }

            ChatService.leaveRoom(room.idRoom);

            $modalInstance.dismiss();
        };

        $scope.submit = function () {

            $scope.post.typePost = TYPE_POST.MESSAGE;

            ChatService.sendPost(room.idRoom, $scope.post);

            $scope.post.content = null;
        };

        _initialize();
    });