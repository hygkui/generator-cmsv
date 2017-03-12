/**
 *
 * Created by hygkui on 2017/3/12
 */
(function () {
    'use strict';
    /**
     * Module dependencies.
     */
    var path = require('path'),
        mongoose = require('mongoose'),
        config = require(path.resolve('./config/config')),
        Timeline = mongoose.model('timeline'),
        responseHandler = require(path.resolve('./config/helper/responseHelper')),
        _ = require('lodash');
    
    
    /**
     * Create a timeline
     */
    exports.create = function (req, res) {
        var timeline = new Timeline(req.body);
        // timeline.timelineID = timeline.generateID();
        
        timeline.save(function (err, newTimeline) {
            if (err) {
                config.error('create timeline error: ' + err);
                return res.send(responseHandler.getMongoErrorMessage(err));
            } else {
                return res.send(responseHandler.getResponseData({
                    code: 'CMSV_CREATE_DATA_OK',
                    messageInfo: ['Timeline', newTimeline.name]
                }));
            }
        });
    };
    
    /**
     * get timeline info by _id
     */
    exports.read = function (req, res) {
        return res.send(responseHandler.getSuccessData(req.model));
    };
    
    /**
     * Update a timeline
     */
    exports.update = function (req, res) {
        var timeline = req.model;
        
        // do modify
        _.extend(timeline, req.body);
        
        timeline.save(function (err) {
            if (err) {
                config.error('update timeline error: ' + err);
                return res.send(responseHandler.getMongoErrorMessage(err));
            } else {
                return res.send(responseHandler.getResponseData({
                    code: 'CMSV_UPDATE_DATA_OK',
                    messageInfo: ['Timeline', timeline.name]
                }));
            }
        });
    };
    
    /**
     * Delete a timeline
     */
    exports.delete = function (req, res) {
        var timeline = req.model;
        timeline.remove(function (err, result) {
            if (err) {
                config.error('Error when remove timeline in db, err is ' + err);
                return res.send(responseHandler.getMongoErrorMessage(err));
            } else {
                return res.send(responseHandler.getResponseData({
                    code: 'CMSV_DELETE_DATA_OK',
                    messageInfo: ['Timeline', '-1']
                }));
            }
        });
    };
    
    /**
     * List of timeline
     */
    exports.list = function (req, res) {
        var options = {
            searchText: req.query.searchText || '',
            criteria: {}
        };
        
        // if (options.searchText && (options.searchText.trim().length !== 0)) {
        //     var searchTextRegEx = new RegExp(escape(options.searchText.trim()), 'i');
        //     options.criteria.$or = [
        //         {
        //             "email": {
        //                 $regex: searchTextRegEx
        //             }
        //         },
        //         {
        //             "displayName": {
        //                 $regex: searchTextRegEx
        //             }
        //         }
        //     ]
        // }
        
        Timeline.count(options.criteria, function (err, count) {
            var totalCount = count;
            options.page = req.query.page;
            options.limit = req.query.limit;
            Timeline.timelinePagination(options, function (err, timelines) {
                if (err) {
                    res.send(responseHandler.getMongoErrorMessage(err));
                } else {
                    res.header('x-total-items-count', totalCount);
                    res.send(responseHandler.getSuccessData(timelines));
                }
            });
        });
        
    };
    
    /**
     * Timeline middleware
     */
    exports.timelineByID = function (req, res, next, id) {
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.send(responseHandler.getResponseData('400'));
        }
        
        Timeline.findById(id)
            .exec(function (err, timeline) {
                if (err) {
                    return res.send(responseHandler.getMongoErrorMessage(err));
                } else if (!timeline) {
                    return res.send(responseHandler.getResponseData('400'));
                }
                req.model = timeline;
                next();
            });
    };
    
}());