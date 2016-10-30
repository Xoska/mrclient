'use strict';

angular.module('mrclient.modals')
    .factory('ChatModalService', function ($modal) {

        function open(options) {

            var modal = $modal.open({
                templateUrl: 'chatModal.html',
                controller: 'ChatModalCtrl',
                size: 'lg',
                backdrop: false,
                resolve: {
                    room: function() {
                        return options.room;
                    }
                }
            });

            return modal.result;
        }

        return {
            open: open
        };
    });
