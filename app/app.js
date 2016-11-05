'use strict';

// Declare app level module which depends on views, and components
angular.module('mrclient', [
    'ngRoute',
    'restangular',
    'ngProgress',
    'ngCookies',
    'pascalprecht.translate',
    'toastr',
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ui.select',

    'constants',
    'services',
    'directives',
    'filters',

    'mrclient.login',
    'mrclient.logout',
    'mrclient.profile',
    'mrclient.search',
    'mrclient.modals',
    'mrclient.unsubscribe'
])
    .config(['$locationProvider', '$routeProvider', '$httpProvider', 'RestangularProvider', 'ENVIRONMENT',
        function($locationProvider, $routeProvider, $httpProvider, RestangularProvider, ENVIRONMENT) {
    
            $routeProvider.otherwise({redirectTo: '/login'});
    
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.withCredentials = true;
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
            $httpProvider.defaults.headers.common["Accept"] = "application/json";
            $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
    
            RestangularProvider.setBaseUrl(ENVIRONMENT.LOCAL);

            $httpProvider.interceptors.push('authInterceptor');
    //        $httpProvider.interceptors.push('progressBarInterceptor');
    }])

    .factory('authInterceptor', function ($rootScope, $cookies, $q, $location, AUTH_EVENTS) {

        function isOnPage(page) {

            return $location.path().indexOf(page) === -1;
        }

        return {
            request: function (config) {

                config.headers = config.headers || {};

                try {

                    if ($cookies.getObject('mr-session')) {

                        config.headers['Authorization'] = 'Bearer ' + $cookies.getObject('mr-session').name;
                    }
                } catch (err) {

                    if (isOnPage('login') && isOnPage('logout')) {

                        $cookies.remove('mr-session');
                        $location.path('/login');
                    }
                }
                return config;
            },

            responseError: function (response) {

                $rootScope.$broadcast({
                    401 : AUTH_EVENTS.notAuthenticated,
                    403 : AUTH_EVENTS.notAuthorized,
                    419 : AUTH_EVENTS.sessionTimeout,
                    440 : AUTH_EVENTS.sessionTimeout
                }[response.status], response);

                return $q.reject(response);
            }
        };
    })

    .run(function ($rootScope, $cookies, UserModel, LazyLoadingService, AUTH_EVENTS) {

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function (event, next, prev) {

            if ($cookies.getObject('mr-session') && !UserModel.getCurrentUser()) {

                UserModel.setCurrentUser($cookies.getObject('mr-session'));
            }

            if (next !== undefined && 'data' in next && next.data) {

                var authorizedRoles = next.data.authorizedRoles;
                
                if (!UserModel.isAuthorized(authorizedRoles)) {
                    
                    event.preventDefault();
                    
                    if (UserModel.isAuthenticated()) {

                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    } else {

                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                    }

                }
            }
        });
    })

    .controller('AppCtrl', function ($rootScope, $location, $timeout,
                                     LazyLoadingService, toastr, UserModel, AUTH_EVENTS) {

        function redirectToLogin() {

            $location.path('/login');
        }

        function destroyUser() {

            UserModel.destroyUser();
        }

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {

            toastr.error('Session invalid', 'Error');

            $timeout(destroyUser, 3000);
        });

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {

            toastr.error('Session timed out', 'Error');

            $timeout(redirectToLogin, 3000);
        });

        $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {

            toastr.error('Session timed out', 'Error');

            $timeout(destroyUser, 3000);
        });

        $rootScope.$on('$routeChangeSuccess', function () {

            window.scrollTo(0, 0);
        });
    });
