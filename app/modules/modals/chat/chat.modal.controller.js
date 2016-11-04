'use strict';

angular.module('mrclient.modals')
    .controller('ChatModalCtrl', function ($scope, $uibModalInstance, ChatService, HelperService,
                                           UserModel, room, toastr, ENVIRONMENT, TYPE_POST) {

        var source = null;
        var username = UserModel.getCurrentUser().username;

        function _getTimeFormat() {

            var time = new Date();

            return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
        }

        function _processEvent(post) {
            
            post.time = _getTimeFormat();

            if (post.typePost === TYPE_POST.MESSAGE) {

                $scope.posts.push(post);
            }
            else if (post.typePost === TYPE_POST.NOTIFICATION_ENTER_ROOM) {

                toastr.success(post.username + post.content, 'Information');

                post.content = 'I have just joined the room!';

                _setTitleConversation(username, post.username);

                $scope.posts.push(post);
            }
            else if (post.typePost === TYPE_POST.NOTIFICATION_LEAVE_ROOM) {

                post.content = 'I just left the room';

                toastr.info(post.username + post.content, 'Information');

                $scope.posts.push(post);
            }
        }

        function _processErrorEventSource() {

            toastr.error('A problem occured while using the chat platform. Please try again.', 'Error');

            $scope.leave();
        }

        function _isConnectionOpen() {

            return source.readyState === 1;
        }

        function _isConnectionPending() {

            return source.readyState === 0;
        }

        function _setTitleWaiting () {

            $scope.title = 'Waiting for someone to join the chat room...';
        }

        function _setTitleConversation (username1, username2) {

            $scope.title = 'Conversation between ' + username1 + ' and ' + username2;
        }


        function _initializeConnectionSSE() {

            if (typeof (EventSource) !== "undefined") {

                source = new EventSource(ENVIRONMENT.LOCAL + 'chat/join/' + room.idRoom);

                source.onmessage = function(event) {

                    if (event.isTrusted) {

                        var post = JSON.parse(event.data);

                        _processEvent(post);
                    }
                };

                source.onopen = function() {

                    if (_isConnectionOpen() && username !== room.owner) {

                        ChatService.sendPost(room.idRoom, $scope.post);
                    }
                    else {

                        _processErrorEventSource();
                    }
                };

                source.onerror = function() {

                    _processErrorEventSource();
                }
            } else {

                _processErrorEventSource();
            }
        }

        function _initialize() {

            if (room.owner === username) {

                _setTitleWaiting();

                toastr.info('You were placed in the queue. Wait until we find a good match for you', 'Information');
            }
            else {

                _setTitleConversation(username, room.owner);

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

            _initializeConnectionSSE();
        }

        $scope.leave = function () {

            if (_isConnectionOpen()) {

                $scope.post.typePost = TYPE_POST.NOTIFICATION_LEAVE_ROOM;
                ChatService.sendPost(room.idRoom, $scope.post);
            }

            if (_isConnectionPending() || _isConnectionOpen()) {

                source.close();
            }

            ChatService.leaveRoom(room.idRoom, UserModel.getCurrentUser().idProfile);

            $uibModalInstance.dismiss();
        };

        $scope.submit = function () {

            if (_isConnectionOpen()) {

                $scope.post.typePost = TYPE_POST.MESSAGE;

                ChatService.sendPost(room.idRoom, $scope.post).then(
                    function(response) {

                        $scope.post.content = null;
                    },
                    function(response) {

                        toastr.error('Error while posting a message', 'Error');
                    });
            }
            else {

                _processErrorEventSource();
            }
        };

        _initialize();
    });