/**
 * Created by Paul on 1/21/2015.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    var Q = require('q');
    var gamesDao = inject('gamesDao');
    var fileUtil = inject('fileUtil');

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
    }

    /**
     *
     * @param id
     * @param file
     * @returns {*}
     */
    //var uploadGameImage = function(id, file) {
    //    //validate game id before preceding
    //    var fail = function(fault) {
    //        //getGameById failed, remove uploaded file
    //        fileUtil.deleteFile(file.filename.path);
    //
    //        return Q.reject(fault);
    //    };
    //
    //    var success = function(result) {
    //        return moveUploadedFile(result, file);
    //    };
    //
    //    return getGameById(id)
    //        .then(success, fail);
    //};
    //
    //var moveUploadedFile = function(game, file) {
    //    var success = function(result) {
    //        return updateGameAfterImageUpload(game, file);
    //    };
    //
    //    var fail = function(fault) {
    //        console.log('games.service - uploadGameImage.fail');
    //        //move failed, attempt to delete original file
    //        fileUtil.deleteFile(file.file.filename.path);
    //
    //        return Q.reject(fault);
    //    };
    //
    //    return fileUtil.moveFile(file.filename.path, config.gameImageDir + file.filename.name)
    //        .then(success, fail);
    //};
    //
    //var updateGameAfterImageUpload = function(game, file) {
    //    var success = function(result) {
    //        return result;
    //    }
    //
    //    var fail = function(fault) {
    //        //update game failed, remove uploaded image
    //        fileUtil.deleteFile(config.gameImageDir + file.filename.name);
    //
    //        return Q.reject(fault);
    //    }
    //
    //    game.imageFileName = file.filename.name;
    //    return putGame(game)
    //        .then(success, fail);
    //};

    return {
        getGames: getGames,
        getGameById: getGameById,
        postGame: postGame,
        putGame: putGame,
        deleteGame: deleteGame,
        uploadGameImage: uploadGameImage
    }
}