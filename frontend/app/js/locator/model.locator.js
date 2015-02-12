/**
 * Created by Paul on 1/28/2015.
 */
var modelLocator = angular.module('modelLocator', []);

modelLocator.service('modelLocator', [
    function() {
        'use strict';
        
        var user = null;

        var games = null;
        var editGame = {};

        return {
            user: user,
            games: games,
            editGame: editGame
        }
    }
])