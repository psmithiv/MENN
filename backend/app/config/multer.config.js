/**
 * Created by Paul on 2/4/2015.
 */
exports = module.exports = init;

function init(config) {
    var multer = require('multer');

    var conf;

    var rename = function(filename, filename) {
        return filename + '_' + Date.now();
    };

    var onFileUploadStart = function(file) {
      console.log('onFileUploadStart: ' + file.originalname);
    };

    var onFileUploadComplete = function(file) {
        console.log('onFileUploadComplete: ' + file.fieldname);
    };

    /**
     * constructor
     */
    (function() {
        console.log('conf.fileDest: ' + config.fileDest)
        conf = multer({
            dest: config.fileDest,
            limits: config.limits,
            rename: rename//,
            //onFileUploadStart: onFileUploadStart,
            //onFileUploadComplete: onFileUploadComplete
        })
    }());


    return conf;
}