/**
 * Created by Paul on 2/10/2015.
 */
var authenticationService = angular.module('authenticationService', []);

authenticationService.service('authenticationService', [
    'serviceLocator',
    
    function() {
        'use strict';

        /**
         * @public 
         */
        var login = function() {
                        
        };

        /**
         * @public 
         */
        var logout = function() {
                        
        };

        /**
         * @public 
         */
        var signUp = function() {
                        
        };

        /**
         * @private
         */
        var isAuthenticated = function() {
            console.log('isAuthenticated');
            var success = function(result) {
                console.log('user isAuthenticated');
            };

            var fail = function(fault) {
                console.log('isAuthenticated fail');
            };

            serviceLocator.isAuthenticated()
                .then(success, fail);
        };

        /**
         * constructor 
         */
        (function() {
            isAuthenticated();
        }());
        
        return {
            login: login,
            logout: logout,
            signUp: signUp
        };
    }
])