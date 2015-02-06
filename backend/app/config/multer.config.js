/**
 * Created by Paul on 2/4/2015.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    //dependencies
    var multer = require('multer');

    var conf;

    var rename = function(filename) {
        return filename + '_' + Date.now();
    };

    /**
     * constructor
     */
    (function() {
        conf = multer({
            dest: config.fileDest,
            limits: config.limits,
            rename: rename
        })
    }());


    return conf;
}