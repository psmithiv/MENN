/**
 * Created by Paul on 1/17/2015.
 */
var mennFrontend = angular.module('mennFrontend', [
    'ngRoute',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.autoResize',
    'ui.grid.resizeColumns',
    'ui.grid.selection',
    'angularFileUpload',

    //locators
    'serviceLocator',
    'modelLocator',

    //directives
    'formUtilDirective',

    //controllers
    'gamesViewController',

    //services
    'gamesService'
])

mennFrontend.config([
    '$routeProvider',

    function($routeProvider) {
        $routeProvider.when('/games', {
            templateUrl: 'partials/view/games.view.html',
            controller: 'gamesViewController'
        }).otherwise({
            redirectTo: '/games'
        });
    }
])

mennFrontend.run([
    function() {}
])