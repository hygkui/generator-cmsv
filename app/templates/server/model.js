/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function () {
    'use strict';
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var <%= Name %>Schema = new Schema({
        name: String,
        created: {
            type: Date,
            default: Date.now
        }
    });

    /**
     * Hook a pre save method
     */
    <%= Name %>Schema.pre('save', function (next) {
        // code here

        next();
    });

    <%= Name %>Schema.methods = {
        // methodName: function () {}

    };

    <%= Name %>Schema.statics = {
        // staticPropertyName: value

        load: function (options, cb) {
            this.findOne(options.criteria)
                .select(options.select)
                .exec(cb);
        },
        loadAll: function (options, cb) {
            this.find(options.criteria)
                .select(options.select)
                .sort(options.sortBy || '-created')
                .exec(cb);
        },
        <%= name %>Pagination: function (options, cb) {
            var MAX_LIMIT = 50; // set max limit for pagination.
            if (options.limit > MAX_LIMIT) {
                options.limit = MAX_LIMIT;
            }
            var q = options.criteria || {},
                col = options.columns || {},
                pageNumber = parseInt(options.page, 10) || 1,
                resultsPerPage = parseInt(options.limit, 10) || 20,
                skipFrom = (pageNumber * resultsPerPage) - resultsPerPage,
                query = this.find(q, col)
                    .select(options.select)
                    .sort(options.sortBy || '-created')
                    .skip(skipFrom)
                    .limit(resultsPerPage);

            query.exec(function (error, results) {
                if (error) {
                    cb(error, null);
                } else {
                    cb(null, results);
                }
            });
        }
    };

    module.exports = mongoose.model('<%= name %>', <%= Name %>Schema, '<%= name %>s');

}());
