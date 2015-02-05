/**
 * Created by Paul on 1/30/2015.
 */
var formUtilDirective = angular.module('formUtilDirective', []);

formUtilDirective.directive('formUtil', [
    '$timeout',

    function($timeout) {
        'use strict';

        return {
            restrict: 'A',
            require: ['form', 'ngModel'],
            scope: {
                ngModel: '=ngModel'
            },
            link: function($scope, $element, $attributes, controllers) {
                console.log('form util directive');

                /**
                 *
                 */
                var form = controllers[0];

                /**
                 *
                 */
                var ngModel = controllers[1];


                /**
                 *
                 */
                var setResetFocus = function() {
                    if(ngModel.$modelValue)
                        return;

                    $timeout(function() {
                        $element.find('.form-control:first-child')[0].focus();

                        form.$setPristine();
                        form.$setUntouched();
                    })
                }

                /**
                 *
                 */
                var setInvalidFocus = function() {
                    var invalidField = $element.find('.ng-invalid:first-child')[0];

                    if (invalidField)
                        invalidField.focus();
                }

                //add watchers and event handlers
                $scope.$watch(function() {
                    return $scope.ngModel;
                }, setResetFocus);

                $element.on('submit', setInvalidFocus);
            }
        }
    }
])