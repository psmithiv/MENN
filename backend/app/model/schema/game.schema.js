/**
 * Created by Paul on 1/22/2015.
 */
exports = module.exports = init;

function init(config) {
    'use strict';

    var mongoose = inject('mongoose');

    var gameSchema,
        model;

    /**
     * Constructor
     */
    (function() {
        gameSchema = new mongoose.Schema({
            created: Date,
            title: String,
            developers: String,
            publishers: String,
            platforms: String,
            releaseDates: Date,
            genres: String,
            awards: String,
            summary: String,
            image: String
        })

        gameSchema.pre('save', function(next) {
            if(!this.created) {
                this.created = new Date();
            }

            next();
        })

        model = mongoose.model(config.table, gameSchema);
    }());

    return model;
}