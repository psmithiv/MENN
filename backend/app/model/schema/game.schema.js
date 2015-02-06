/**
 * Created by Paul on 1/22/2015.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    //dependencies
    var mongoose = inject('mongoose');

    var gameSchema,
        model;

    /**
     * Constructor
     */
    (function () {
        gameSchema = new mongoose.Schema({
            created: {type: Date},
            title: {type: String},
            developers: {type: String},
            publishers: {type: String},
            platforms: {type: String},
            releaseDates: {type: Date},
            genres: {type: String},
            awards: {type: String},
            summary: {type: String},
            image: {type: String}
        })

        gameSchema.pre('save', function (next) {
            if (!this.created) {
                this.created = new Date();
            }

            next();
        })

        model = mongoose.model(config.table, gameSchema);
    }());

    return model;
}