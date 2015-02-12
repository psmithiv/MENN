var headerViewController = angular.module('headerViewController', []);

headerViewController.controller('headerViewController', [
    '$scope',
    'modelLocator',
    'modalService',

    function($scope, modelLocator, modalService) {
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
        var register = function() {
            modalService.showRegistrationModal();
        };

        /**
         * @public
         */
        var login = function() {
            modalService.showLoginModal();
        };

        //expose $scope properties
        $scope.modelLocator = modelLocator;

        //expose $scope public methods
        $scope.login = login;
        $scope.logout = logout;
        $scope.register = register;
    }
]);