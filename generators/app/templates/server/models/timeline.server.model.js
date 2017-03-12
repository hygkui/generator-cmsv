/**
 *
 * Created by hygkui on 2017/3/12
 */
(function () {
    'use strict';
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;
    
    var TimelineSchema = new Schema({
        title: String,
        user: {
            type: Schema.ObjectId,
            ref: 'user'
        },
        detail: Object,
        module: String,  // category by module name
        level: {
            type: Number,
            enum: [0, 1, 2], // normal, key, core event level
            default: 0
        },
        tags: [String],
        created: {
            type: Date,
            default: Date.now
        }
    });
    
    /**
     * Hook a pre save method
     */
    TimelineSchema.pre('save', function (next) {
        // code here
        
        next();
    });
    
    TimelineSchema.methods = {
        // methodName: function () {}
        
    };
    
    TimelineSchema.statics = {
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
        timelinePagination: function (options, cb) {
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
    
    module.exports = mongoose.model('timeline', TimelineSchema, 'timelines');
    
}());