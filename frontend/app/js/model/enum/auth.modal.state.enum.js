/**
 * Created by Paul on 2/11/2015.
 */
var authModalStateEnum = angular.module('authModalStateEnum', []);

authModalStateEnum.factory('authModalStateEnum', [
    function() {
        return {
            REGISTER: { id: 0, name: 'Register' },
            LOGIN: { id: 1, name: 'Login'}
        }
    }
]);