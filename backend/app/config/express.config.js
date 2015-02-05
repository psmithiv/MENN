/**
 * Created by Paul on 1/6/2015.
 */
exports = module.exports = init;

function init(config) {
    var express = require('express');
    var bodyParser = require('body-parser');
    var multer = inject('multer');

    /**
     * Express app instance
     *
     * @private
     */
    var app;

    /**
     * Constructor
     */
    (function() {
        app = express();
        app.listen(config.port);
        app.use(bodyParser.json());
        app.use(multer);
        app.use('/', express.static(config.staticDir));
    }());

    return app;
}
