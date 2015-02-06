/**
 * Created by Paul on 1/6/2015.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    //dependencies
    var express = require('express'),
        bodyParser = require('body-parser'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        MongoStore = require('connect-mongo')(session),
        multer = inject('multer');

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
        app.use('/', express.static(config.staticDir));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use(session({
            secret: config.sessionSecret,
            store: new MongoStore({
                db: config.sessionTable
            }),
            saveUninitialized: true,
            resave: true,
            unset: 'destroy'
        }));
        app.use(multer);
        app.listen(config.port);
    }());

    return app;
}
