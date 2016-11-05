'use strict';

angular.module('mrclient.modals')
    .controller('ChatModalCtrl', function ($scope, $uibModalInstance, ChatService, HelperService,
                                           UserModel, room, toastr, ENVIRONMENT, TYPE_POST) {

        var source = null;

        function _getTimeFormat() {

            var time = new Date();

            var hours = HelperService.padZero(time.getHours(), 2);
            var minutes = HelperService.padZero(time.getMinutes(), 2);
            var seconds = HelperService.padZero(time.getSeconds(), 2);

            return hours + ':' + minutes + ':' + seconds;
        }

        function _pushMessageToChatbox(post) {

            $(".msg-wrap").animate({ scrollTop: $('.msg-wrap').prop("scrollHeight")}, 1);

            $scope.posts.push(post);
        }

        function _enterRoom(username) {

            var post = {
                username: username,
                time: _getTimeFormat(),
                typePost: TYPE_POST.NOTIFICATION_ENTER_ROOM
            };

            _pushMessageToChatbox(post);
        }

        function _processEvent(post) {
            
            post.time = _getTimeFormat();

            if (post.typePost === TYPE_POST.MESSAGE) {

                _pushMessageToChatbox(post);
            }
            else if (post.typePost === TYPE_POST.NOTIFICATION_ENTER_ROOM) {

                if ($scope.username !== post.username) {

                    $scope.interlocutor = post.username;
                    _enterRoom($scope.interlocutor);
                }
            }
            else if (post.typePost === TYPE_POST.NOTIFICATION_LEAVE_ROOM) {

                _pushMessageToChatbox(post);
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

            $scope.title = 'Waiting for someone to match your criterias...';
        }

        function _initializeConnectionSSE() {

            if (typeof (EventSource) !== "undefined") {

                source = new EventSource(ENVIRONMENT.LOCAL + 'chat/join/' + room.idRoom);

                source.onmessage = function(event) {

                    if (event.isTrusted) {

                        var post = JSON.parse(event.data);

                        _processEvent(post);

                        $scope.$apply();
                    }
                };

                source.onopen = function() {

                    if (_isConnectionOpen() && $scope.username !== room.owner) {

                        ChatService.sendPost(room.idRoom, $scope.post);
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

            $scope.posts = [];

            $scope.username = UserModel.getCurrentUser().username;
            _enterRoom($scope.username);
            
            if (room.owner === $scope.username) {

                _setTitleWaiting();
            }
            else {

                $scope.interlocutor = room.owner;
                _enterRoom($scope.interlocutor);
            }

            $scope.post = {
                idPost: null,
                idProfile: UserModel.getCurrentUser().idProfile,
                username: $scope.username,
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