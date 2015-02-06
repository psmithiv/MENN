/**
 * Created by Paul on 1/21/2015.
 */
exports = module.exports = init;

function init() {
    'use strict';

    //dependencies
    var express = inject('express'),
        system = inject('systemConstants'),
        gamesService = inject('gamesService'),
        GameSchema = inject('gameSchema');

    /**
     * Expose GET /games endpoint
     *
     * @private
     * @param req
     * @param res
     */
    var getGames = function(req, res) {
        console.log('gamesController.getGames');

        //confirm authentication/authorization
        //if rejected res.send(403/401);

        var success = function(result) {
            res.send(result);
        };

        var fail = function(fault) {
            res.send(fault);
        };

        gamesService.getGames()
            .then(success, fail);
    };

    /**
     * Expose GET /game/:id endpoint
     *
     * @private
     * @param req
     * @param res
     */
    var getGameById = function(req, res) {
        console.log('gamesController.getGameById');

        //confirm authentication/authorization
        //if rejected res.send(403/401);

        var success = function(result) {
            res.send(result);
        };

        var fail = function(fault) {
            res.send(fault);
        };

        var id = req.params.id;
        gamesService.getGameById(id)
            .then(success, fail);
    };

    /**
     * Expose POST /game endpoint
     *
     * @private
     * @param req
     * @param res
     */
    var postGame = function(req, res) {
        console.log('gamesController.postGame');

        //confirm authentication/authorization
        //if rejected res.send(403/401);

        var success = function(result) {
            res.send(result);
        };

        var fail = function(fault) {
            res.send(fault);
        };

        var game = new GameSchema(req.body);
        gamesService.postGame(game)
            .then(success, fail);
    };

    /**
     * Expose PUT /game endpoint
     *
     * @private
     * @param req
     * @param res
     */
    var putGame = function(req, res) {
        console.log('gamesController.putGame');

        //confirm authentication/authorization
        //if rejected res.send(403/401);

        var success = function(result) {
            res.send(result);
        };

        var fail = function(fault) {
            res.send(fault);
        };

        var game = new GameSchema(req.body);
        gamesService.putGame(game)
            .then(success, fail);
    };

    /**
     * Expose DELETE /game endpoint
     *
     * @private
     * @param req
     * @param res
     */
    var deleteGame = function(req, res) {
        console.log('gamesController.deleteGame');

        //confirm authentication/authorization
        //if rejected res.send(403/401);

        var success = function(result) {
            res.send(result);
        };

        var fail = function(fault) {
            res.send(fault);
        };

        var id = req.params.id;
        gamesService.deleteGame(id)
            .then(success, fail);
    };

    var uploadGameImage = function(req, res) {
        //confirm authentication/authorization
        //if rejected res.send(403/401);

        var success = function(result) {
            console.log('games.controller.success: ' + result);
            res.send(result);
        };

        var fail = function(fault) {
            res.send(fault);
        };

        gamesService.uploadGameImage(req.files)
            .then(success, fail);
    };

    /**
     * Constructor
     *
     * @private
     */
    (function() {
        express.get(system.API_VERSION + '/games', getGames);
        express.get(system.API_VERSION + '/game/:id', getGameById);
        express.post(system.API_VERSION + '/game', postGame);
        express.put(system.API_VERSION + '/game', putGame);
        express.delete(system.API_VERSION + '/game/:id', deleteGame);
        express.post(system.API_VERSION + '/game/upload', uploadGameImage);
    }());
}