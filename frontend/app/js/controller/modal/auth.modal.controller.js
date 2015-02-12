/**
 * Created by Paul on 2/11/2015.
 */
var authModalController = angular.module('authModalController', []);

authModalController.controller('authModalController', [
    '$scope',
    '$modalInstance',
    'config',
    'authModalStateEnum',
    
    function($scope, $modalInstance, config, authModalStateEnum) {
        'use strict';

        /**
         * @public 
         */
        var close = function() {
            $modalInstance.close();
        };

        /**
         * @public 
         */
        var showState = function(state) {
            $scope.state = state;
        };
        
        /**
         * constructor
         */
        (function() {
            console.log('$modalInstance:' + $modalInstance);
            console.log('config.state: ' + config);
        }());
        
        //expose $scope properties
        $scope.authModalStateEnum = authModalStateEnum;
        $scope.state = config.state;
        
        //expose scope methods
        $scope.close = close;
        $scope.showState = showState;
    }
]);