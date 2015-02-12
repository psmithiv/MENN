/**
 * Created by Paul on 2/10/2015.
 */
modalService = angular.module('modalService', []);

modalService.service('modalService', [
    '$modal',
    'authModalStateEnum',
    
    function($modal, authModalStateEnum) {
        'use strict';

        /**
         * @public 
         */
        var showLoginModal = function() {
            return createModal('partials/modal/authentication/authentication.modal.view.html', 'authModalController', {state: authModalStateEnum.LOGIN});
        };

        /**
         * @public 
         */
        var showRegistrationModal = function() {
            return createModal('partials/modal/authentication/authentication.modal.view.html', 'authModalController', {state: authModalStateEnum.REGISTER});
        };

        /**
         * @private
         */
        var createModal = function(templateUrl, controller, config) {
            var modalInstance = $modal.open({
                templateUrl: templateUrl,
                controller: controller,
                resolve: {
                    config: function() {
                        return config;
                    }
                }
            });
            
            return modalInstance;
        };
        
        return {
            showLoginModal: showLoginModal,
            showRegistrationModal: showRegistrationModal
        }
    }
]);