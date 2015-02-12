/**
 * Created by Paul on 1/23/2015.
 */
var serviceLocator = angular.module('serviceLocator', []);

serviceLocator.service('serviceLocator', [
    '$http',
    '$upload',

    function($http, $upload) {
        'use strict';

        var baseUrl = '/v1';

        /**
         *
         * @returns {HttpPromise}
         */
        var getGames = function() {
            return $http.get(baseUrl + '/games');
        };

        /**
         *
         * @param id
         * @returns {HttpPromise}
         */
        var getGameById = function(id) {
            return $http.get(baseUrl + '/game/' + id);
        };

        /**
         *
         * @param game
         * @returns {HttpPromise}
         */
        var putGame = function(game) {
            return $http.put(baseUrl + '/game', game);
        };

        /**
         *
         * @param game
         * @returns {HttpPromise}
         */
        var postGame = function(game) {
            return $http.post(baseUrl + '/game', game);
        };

        /**
         *
         * @param id
         * @returns {HttpPromise}
         */
        var deleteGame = function(id) {
            return $http.delete(baseUrl + '/game/' + id);
        };

        var uploadGameImage = function(file) {
            return $upload.upload({
                url: baseUrl + '/game/upload',
                method: 'POST',
                fileFormDataName: "filename",
                file: file
            })
        }
        
        var isAuthenticated = function() {
            return http.get(baseUrl + '/authenticated');
        }

        //expose public properties/methods
        return {
            getGames: getGames,
            getGameById: getGameById,
            putGame: putGame,
            postGame: postGame,
            deleteGame: deleteGame,
            uploadGameImage: uploadGameImage
        }
    }
])