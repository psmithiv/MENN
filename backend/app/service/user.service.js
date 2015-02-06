/**
 * Created with IntelliJ IDEA.
 * User: psmithiv
 * Date: 7/3/14
 * Time: 1:48 PM
 * To change this template use File | Settings | File Templates.
 */
exports = module.exports = init;

/**
 * @class
 */
function init() {
    'use strict';
    
    //dependencies
    var Q = require('q'),
        userDao = inject('userDao');

    /**
     * @public 
     * @param callback
     */
    var getUsers = function() {
        return userDao.getUsers();
    };

    /**
     * @public
     * @param user
     * @param session
     */
    var postUser = function(user, session) {
        var success = function(result) {
            return postValidatedUser(user, session);
        };
        
        var fail = function(fault) {
            Q.reject(fault);
        };
        
        return validateUser(user)
            .then(success, fail);
    };

    /**
     * @private
     * @param user
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|Q.promise|*}
     */
    var validateUser = function(user) {
        var deferred = Q.defer();
        
        user.validate(function(err) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve();
            }
        });
        
        return deferred.promise;
    };

    /**
     * @private
     * @param user
     * @param session
     * @returns {*}
     */
    var postValidatedUser = function(user, session) {
        var success = function(result) {
            session.user = result;
            
            return user;
        };

        var fail = function(fault) {
            return Q.reject(fault);
        };

        return userDao.postUser(user)
            .then(success, fail);
    };
    
    return {
        getUsers: getUsers,
        postUser: postUser
    }
}