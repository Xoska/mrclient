'use strict';

angular.module('services')
    .factory('progressBarInterceptor', function ($q, ngProgressFactory) {

        var completeProgress;
        var getProgressBar;
        var progressBar;
        var working;
        var completeDelay = 1500;
        
        progressBar = null;
        working = null;

        getProgressBar = function () {

            progressBar = progressBar || ngProgressFactory.createInstance();
            
            return progressBar;
        };

        completeProgress = function () {

            var _progressBar;

            if (working) {
                
                _progressBar = getProgressBar();
                _progressBar.complete();

                setTimeout(function () {
                    working = false;
                }, completeDelay);

                return working;
            }
        };

        return {
            request: function (request) {

                var _progressBar;

                _progressBar = getProgressBar();
                
                if (!working) {

                    _progressBar.start();
                    working = true;
                }

                return request;
            },
            requestError: function (error) {

                completeProgress();

                return $q.reject(error);
            },
            response: function (response) {

                completeProgress();

                return response;
            },
            responseError: function (error) {

                completeProgress();

                return $q.reject(error);
            }
        };
    });