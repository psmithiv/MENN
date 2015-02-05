/**
 * Created by Paul on 1/23/2015.
 */
var gamesService = angular.module('gamesService', []);

gamesService.service('gamesService', [
    'serviceLocator',
    'modelLocator',

    function(serviceLocator, modelLocator) {
        'use strict';

        /**
         * @public
         */
        var getGames = function() {
            var success = function(result) {
                //tmp
                modelLocator.games = result.data;

                if(modelLocator.games.length)
                    getGameById(modelLocator.games[0]);
            };

            var fail = function(fault) {
                console.log('getGames.fail');
                console.dir(fault);
            };

            return serviceLocator.getGames().
                then(success, fail);
        };

        /**
         * @public
         * @param game
         */
        var getGameById = function(game) {
            var success = function(result) {
                modelLocator.editGame = result.data
            };

            var fail = function(fault) {
                console.log('getGameById.fail');
                console.dir(fault);
            };

            serviceLocator.getGameById(game._id)
                .then(success, fail);
        };

        /**
         * @public
         * @param game
         * @returns {*}
         */
        var putGame = function(game) {
            var success = function(result) {
                var index = _.findIndex(modelLocator.games, {_id: result.data._id});
                modelLocator.games[index] = result.data;

                modelLocator.editGame = angular.copy(result.data);
            };

            var fail = function(fault) {
                console.log('putGame.fail');
                console.dir(fault);
            };

            return serviceLocator.putGame(game)
                .then(success, fail);
        };

        /**
         * @public
         * @param game
         * @returns {*}
         */
        var postGame = function(game) {
            var success = function(result) {
                modelLocator.games.push(result.data);

                modelLocator.editGame = angular.copy(result.data);
            };

            var fail = function(fault) {
                console.log('postGame.fail');
                console.dir(fault);
            };

            return serviceLocator.postGame(game)
                .then(success, fail);
        };

        /**
         * @public
         * @param game
         */
        var deleteGame = function(game) {
            var success = function(result) {
                var index = _.findIndex(modelLocator.games, {_id: result.data._id});
                modelLocator.games.splice(index, 1);

                if(modelLocator.games.length && result.data._id == modelLocator.editGame._id) {
                    getGameById(modelLocator.games[0]);
                }
            };

            var fail = function(fault) {
                console.log('deleteGame.fail');
                console.dir(fault);
            };

            serviceLocator.deleteGame(game._id)
                .then(success, fail);
        };

        /**
         * @public
         * @param id
         * @param file
         */
        var uploadGameImage = function(file) {
            var success = function(result) {
                if(!modelLocator.editGame)
                    modelLocator.editGame = {};

                modelLocator.editGame.image = result.data.image;
            };

            var fail = function(fault) {
                console.log('games.service.uploadGameImage.fail: ' + fault);
            };

            serviceLocator.uploadGameImage(file)
                .then(success, fail);
        };

        /**
         * @public
         */
        var newGame = function() {
            modelLocator.editGame = null;
        };

        //expose public properties/methods
        return {
            getGames: getGames,
            getGameById: getGameById,
            putGame: putGame,
            postGame: postGame,
            deleteGame: deleteGame,
            uploadGameImage: uploadGameImage,
            newGame: newGame
        }
    }
]);