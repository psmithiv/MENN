/**
 * Created by Paul on 1/28/2015.
 */
var modelLocator = angular.module('modelLocator', []);

modelLocator.service('modelLocator', [
    function() {
        'use strict';

        var games = null;
        var editGame = {};

        return {
            games: games,
            editGame: editGame
        }
    }
])