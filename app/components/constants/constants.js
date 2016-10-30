'use strict';

angular.module('constants', [])

    .constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logoutSuccess: 'auth-logout-success',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    })

    .constant('SESSION_STATE', {
            sessionExpired: 'SESSION_EXPIRED',
            sessionInvalid: 'SESSION_INVALID'
    })

    .constant('USER_ROLES', {
        ANONYMOUS: 'ANONYMOUS',
        ADMINISTRATOR: 'ADMINISTRATOR',
        PRIVILEGED_MEMBER: 'PRIVILEGED_MEMBER',
        MEMBER: 'MEMBER'
    })

    .constant('ENVIRONMENT', {
        LOCAL: 'http://localhost:8080/'
    });




