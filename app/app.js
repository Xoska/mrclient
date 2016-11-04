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
    'angularjs-dropdown-multiselect',

    'constants',
    'services',
    'directives',

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

                    if ($cookies.get('mr-token')) {

                        config.headers['Authorization'] = 'Bearer ' + $cookies.get('mr-token');
                    }
                } catch (err) {

                    if (isOnPage('login') && isOnPage('logout')) {

                        $cookies.remove('mr-token');
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

    .run(function ($rootScope, $state, $timeout, $translate,
                   $stateParams, $filter, UserModel, AUTH_EVENTS) {

        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$routeChangeStart', function (event, next, prev) {

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

        LazyLoadingService.lazyLoadData();

        function getSubdomain(segments) {

            var subdomain = segments.length > 2 ? segments[0].toLowerCase() : null;

            if (subdomain && subdomain.indexOf('-dev') !== -1) {

                subdomain = subdomain.substr(0, (subdomain.length - 4));
            } else if (subdomain && subdomain.indexOf('-local') !== -1) {

                subdomain = subdomain.substr(0, (subdomain.length - 6));
            } else if (subdomain && subdomain.indexOf('-canary') !== -1) {

                subdomain = subdomain.substr(0, (subdomain.length - 7));
            }

            if (subdomain) {

                subdomain = subdomain.replace(/\d+$/, '');
            }

            return subdomain;
        }
    });
