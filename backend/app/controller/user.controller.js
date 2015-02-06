/**
 * Created with IntelliJ IDEA.
 * User: psmithiv
 * Date: 7/3/14
 * Time: 1:39 PM
 * To change this template use File | Settings | File Templates.
 */
exports = module.exports = init;

/**
 * Module initialization method
 */
function init() {
    'use strict';
    
    //dependencies
    var express = inject('express'),
        userService = inject('userService'),
        UserSchema = inject('userSchema');

    /**
     * testing! to be removed.
     *
     * @private
     * @param req
     * @param res
     */
    var getUsers = function(req, res) {
        var success = function(result) {
            res.send(result);
        };
        
        var fail = function(fault) {
            res.send(fault);
        };
        
        userService.getUsers()
            .then(success, fail);
    };

    /**
     * @private
     * @param req
     * @param res
     */
    var postUser = function(req, res) {
        var success = function(result) {
            res.send(result);
        };
        
        var fail = function(fault) {
            res.send(fault);
        };
        
        var user = new UserSchema(req.body);
        userService.postUser(user, req.session)
            .then(success, fail);
    };

    /**
     * constructor
     */
    (function() {
        express.get('/users', getUsers);
        express.post('/user', postUser);
    }());
}