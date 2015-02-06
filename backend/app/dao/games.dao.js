/**
 * Created by Paul on 1/21/2015.
 */
exports = module.exports = init;

function init() {
    'use strict';

    //dependencies
    var Q = require('q'),
        GameSchema = inject('gameSchema');

    /**
     * @public
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|Q.promise|*}
     */
    var getGames = function () {
        console.log('gamesDao.getGames');

        var deferred = Q.defer();

        GameSchema.find({}).exec(function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    };

    /**
     * @public
     * @param id
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|Q.promise|*}
     */
    var getGameById = function (id) {
        console.log('gamesDao.getGameById');

        var deferred = Q.defer();

        GameSchema.findById(id).exec(function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    };

    /**
     * @public
     * @param game
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|Q.promise|*}
     */
    var postGame = function (game) {
        console.log('gamesDao.postGame');

        var deferred = Q.defer();

        game.save(function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    };

    /**
     * @public
     * @param game
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|Q.promise|*}
     */
    var putGame = function (game) {
        console.log('gamesDao.putGame');

        var deferred = Q.defer();

        GameSchema.findById(game._id).exec(function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                result.title = game.title;
                result.developers = game.developers;
                result.publishers = game.publishers;
                result.platforms = game.platforms;
                result.releaseDates = game.releaseDates;
                result.genres = game.genres;
                result.awards = game.awards;
                result.summary = game.summary;
                result.image = game.image;

                result.save(function (err, result) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(result);
                    }
                })
            }
        });

        return deferred.promise;
    };

    /**
     * @public
     * @param id
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|Q.promise|*}
     */
    var deleteGame = function (id) {
        console.log('gamesDao.deleteGame');

        var deferred = Q.defer();

        GameSchema.findByIdAndRemove(id, function (err, result) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });

        return deferred.promise;
    };

    //expose public properties/methods
    return {
        getGames: getGames,
        getGameById: getGameById,
        postGame: postGame,
        putGame: putGame,
        deleteGame: deleteGame
    };
}