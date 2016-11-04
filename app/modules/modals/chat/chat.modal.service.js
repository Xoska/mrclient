'use strict';

angular.module('mrclient.modals')
    .factory('ChatModalService', function ($uibModal) {

        function open(options) {

            var modal = $uibModal.open({
                templateUrl: 'chatModal.html',
                controller: 'ChatModalCtrl',
                size: 'md',
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
