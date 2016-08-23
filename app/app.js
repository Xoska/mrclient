'use strict';

// Declare app level module which depends on views, and components
angular.module('mrclient', [
    'ngRoute',
    'restangular',

    'constants',
    'services',

    'mrclient.login',
    'mrclient.profile',
    'mrclient.searchChat'
])
    .config(['$locationProvider', '$routeProvider', '$httpProvider', 'RestangularProvider',
        function($locationProvider, $routeProvider, $httpProvider, RestangularProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/login'});

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["Content-Type"] = "application/json";

        RestangularProvider.setBaseUrl('http://localhost:8080');
    }])

    .factory('authInterceptor', function ($rootScope, $q, $window) {

        function notInLoginPage() {

            return $window.location.pathname.indexOf('login') === -1;
        }

        function notIntLogoutPage() {

            return $window.location.pathname.indexOf('logout') === -1;
        }
    });
