/**
 * Created with IntelliJ IDEA.
 * User: psmithiv
 * Date: 7/3/14
 * Time: 2:07 PM
 * To change this template use File | Settings | File Templates.
 */
exports = module.exports = init;

/**
 * @class
 */
function init(config) {
    'use strict';
    
    //dependencies
    var crypto = require('crypto'),
        Q = require('q'),
        UserSchema = inject('userSchema');
    

    /**
     * @public
     */
    var getUsers = function() {
        var deferred = Q.defer();

        UserSchema.find({}).exec(function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        
        return deferred.promise
    };

    /**
     * @public
     * @param name
     */
    var getUserByUsername = function(name) {
        var deferred = Q.defer();
        
        UserSchema.findOne({username: name}).exec(function(err, result) {
            if(err) {
                deferred.reject(err);                
            } else {
                deferred.resolve(result);
            }
        });
        
        return deferred.promise;
    };

    /**
     * @public
     * @param user
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|Q.promise|*}
     */
    var postUser = function(user) {
        var success = function(result) {
            return postUserWithEncryptedPassword(user, result);
        };
        
        var fail = function(fault) {
            return Q.reject(fault);
        }
        
        return encryptPassword(user)
            .then(success, fail);
    };

    /**
     * @private
     * @param user
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|Q.promise|*}
     */
    var encryptPassword = function(user) {
        var deferred = Q.defer();
        
        user.creationDate = new Date();
        user.salt = crypto.randomBytes(128).toString('base64');
        user.iterations = config.iterations;

        crypto.pbkdf2(user.password, user.salt, user.iterations, 512,
            function(err, derivedKey) {
                if(err) {
                    return deferred.reject(err);
                } else {
                    deferred.resolve(derivedKey);
                }
            }
        );   
        
        return deferred.promise;
    }

    /**
     * @private
     * @param user
     * @param derivedKey
     * @returns {jQuery.promise|promise.promise|d.promise|promise|.ready.promise|Q.promise|*}
     */
    var postUserWithEncryptedPassword = function(user, derivedKey) {
        var deferred = Q.defer();
        
        user.password = derivedKey;

        user.save(function(err, result) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(result);
            }
        });
        
        return deferred.promise;
    };

    return {
        getUsers: getUsers,
        getUserByUsername: getUserByUsername,
        postUser: postUser
    }
}