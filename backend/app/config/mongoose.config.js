/**
 * Created by Paul on 1/6/2015.
 */
exports = module.exports = init;

function init(config) {
    var mongoose = require('mongoose');

    /**
     * MongoDB connection url
     *
     * @private
     */
    var uri;

    /**
     * Constructor
     */
    (function() {
        uri = 'mongodb://' + config.host + ':' + config.port + '/' + config.databaseId;

        mongoose.connect(uri, function(err, res) {
            if (err) {
                console.log ('ERROR: Error connecting to MongoDB: ' + uri + '. ' + err);
            } else {
                console.log ('DEBUG: Connected to MongoDB: ' + uri);
            }
        })
    }());

    return mongoose;
}