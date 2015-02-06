/**
 * Created with IntelliJ IDEA.
 * User: psmithiv
 * Date: 7/3/14
 * Time: 1:06 PM
 * To change this template use File | Settings | File Templates.
 */
exports = module.exports = init;

/**
 * @class
 * @param config
 */
function init(config) {
    'use strict';

    //dependencies
    var mongoose = inject('mongoose'),
        crypto = require('crypto');

    var userSchema,
        model;

    (function () {
        userSchema = new mongoose.Schema({
            email: {type: String, required: '{PATH} is required!'},
            username: {type: String, unique: true, required: '{PATH} is required!'},
            password: {type: String, required: '{PATH} is required!'},
            name: {type: String},
            created: {type: Date},
            salt: {type: String},
            iterations: {type: Number}
        });

        userSchema.pre('save', function (next) {
            if (!this.created) {
                this.created = new Date();
            }

            next();
        });

        userSchema.methods.toJSON = function () {
            var obj = this.toObject();

            delete obj.password;
            delete obj.salt;
            delete obj.iterations;
            delete obj.__v; //?
            delete obj._id; //?

            return obj
        };

        model = mongoose.model(config.table, userSchema);
    }());

    return model;
}