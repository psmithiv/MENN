/**
 * Created by Paul on 2/4/2015.
 */
exports = module.exports = init;

function init() {
    var fs = require('fs');
    var Q = require('q');

    /**
     * @public
     * @param source
     * @param destination
     */
    var moveFile = function(source, destination) {
        var deferred = Q.defer();

        console.log('source: ' + source);
        console.log('destination: ' + destination);

        fs.rename(source, destination, function(err) {
            console.log('rename: ' + err);

            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(destination);
            }
        });

        return deferred.promise;
    };

    var deleteFile = function(source) {
        var deferred = Q.defer();

        fs.unlink(source, function(err) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(source);
            }
        });

        return deferred.promise;
    };

    return {
        moveFile: moveFile,
        deleteFile: deleteFile
    }
}