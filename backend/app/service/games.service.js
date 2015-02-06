/**
 * Created by Paul on 1/21/2015.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    //dependencies
    var Q = require('q'),
        gamesDao = inject('gamesDao'),
        fileUtil = inject('fileUtil');

    /**
     * @public
     * @returns {*}
     */
    var getGames = function() {
        console.log('gamesService.getGames');

        //return summary?

        return gamesDao.getGames();
    };

    /**
     * @public
     * @param id
     * @returns {*}
     */
    var getGameById = function(id) {
        console.log('gamesService.getGameById');

        //load gallery data, merge with game data

        return gamesDao.getGameById(id);
    };

    /**
     * @public
     * @param game
     * @returns {*}
     */
    var postGame = function(game) {
        console.log('gamesService.postGame');

        //validate data
        //if invalid: return Q.reject(reason);
        //else continue

        return gamesDao.postGame(game);
    };

    /**
     * @public
     * @param game
     * @returns {*}
     */
    var putGame = function(game) {
        console.log('gamesService.putGame');

        //validate data
        //if invalid: return Q.reject(reason);
        //else continue

        return gamesDao.putGame(game);
    };

    /**
     * @public
     * @param id
     * @returns {*}
     */
    var deleteGame = function(id) {
        console.log('gamesService.deleteGame');

        //validate data
        //if invalid: return Q.reject(reason);
        //else continue

        return gamesDao.deleteGame(id);
    };

    var uploadGameImage = function(file) {
        var success = function(result) {
            return {
                image: file.filename.name
            }
        };

        var fail = function(fault) {
            //move failed, attempt to delete original file
            fileUtil.deleteFile(file.file.filename.path);

            return Q.reject(fault);
        };

        return fileUtil.moveFile(file.filename.path, config.gameImageDir + file.filename.name)
            .then(success, fail);
    };

    return {
        getGames: getGames,
        getGameById: getGameById,
        postGame: postGame,
        putGame: putGame,
        deleteGame: deleteGame,
        uploadGameImage: uploadGameImage
    }
}