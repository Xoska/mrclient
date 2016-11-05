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
    })

    .constant('TYPE_POST', {
        MESSAGE: 'MESSAGE',
        NOTIFICATION_ENTER_ROOM: 'NOTIFICATION_ENTER_ROOM',
        NOTIFICATION_LEAVE_ROOM: 'NOTIFICATION_LEAVE_ROOM'
    })

    .constant('ERRORS_CODE', {
        USERNAME_ALREADY_EXIST: 'USERNAME_ALREADY_EXIST',
        INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
        PROFILE_INVALID: 'PROFILE_INVALID',
        PROFILE_ALREADY_QUEUED: 'PROFILE_ALREADY_QUEUED'
    })

    .constant('LABELS', {
        GOAL_FRIENDSHIP: 'Friendship',
        GOAL_DATING: 'Dating',
        SEX_MALE: 'Male',
        SEX_FEMALE: 'Female',
        SEX_OTHER: 'Other',
        ANY: 'Any',
        MEMBER: 'Member',
        PRIVILEGED_MEMBER: 'Privileged Member',
        ADMINISTRATOR: 'Administrator'
    });



