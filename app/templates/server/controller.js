/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function () {
    'use strict';
    /**
     * Module dependencies.
     */
    var path = require('path'),
        mongoose = require('mongoose'),
        config = require(path.resolve('./config/config')),
        <%= Name %> = mongoose.model('<%= name %>'),
        responseHandler = require(path.resolve('./config/helper/responseHelper')),
        _ = require('lodash');


    /**
     * Create a <%= name %>
     */
    exports.create = function (req, res) {
        var <%= name %> = new <%= Name %>(req.body);
        // <%= name %>.<%= name %>ID = <%= name %>.generateID();

        <%= name %>.save(function (err, new<%= Name %>) {
            if (err) {
                config.error('create <%= name %> error: ' + err);
                return res.send(responseHandler.getMongoErrorMessage(err));
            } else {
                return res.send(responseHandler.getResponseData({
                    code: 'CMSV_CREATE_DATA_OK',
                    messageInfo: ['<%= Name %>', new<%= Name %>.name]
                }));
            }
        });
    };

    /**
     * get <%= name %> info by _id
     */
    exports.read = function (req, res) {
        return res.send(responseHandler.getSuccessData(req.model));
    };

    /**
     * Update a <%= name %>
     */
    exports.update = function (req, res) {
        var <%= name %> = req.model;

        // do modify
        _.extend(<%= name %>, req.body);

        <%= name %>.save(function (err) {
            if (err) {
                config.error('update <%= name %> error: ' + err);
                return res.send(responseHandler.getMongoErrorMessage(err));
            } else {
                return res.send(responseHandler.getResponseData({
                    code: 'CMSV_UPDATE_DATA_OK',
                    messageInfo: ['<%= Name %>', <%= name %>.name]
                }));
            }
        });
    };

    /**
     * Delete a <%= name %>
     */
    exports.delete = function (req, res) {
        var <%= name %> = req.model;
        <%= name %>.remove(function (err, result) {
            if (err) {
                config.error('Error when remove <%= name %> in db, err is ' + err);
                return res.send(responseHandler.getMongoErrorMessage(err));
            } else {
                return res.send(responseHandler.getResponseData({
                    code: 'CMSV_DELETE_DATA_OK',
                    messageInfo: ['<%= Name %>', '-1']
                }));
            }
        });
    };

    /**
     * List of <%= name %>
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

        <%= Name %>.count(options.criteria, function (err, count) {
            var totalCount = count;
            options.page = req.query.page;
            options.limit = req.query.limit;
            <%= Name %>.<%= name %>Pagination(options, function (err, <%= name %>s) {
                if (err) {
                    res.send(responseHandler.getMongoErrorMessage(err));
                } else {
                    res.header('x-total-items-count', totalCount);
                    res.send(responseHandler.getSuccessData(<%= name %>s));
                }
            });
        });

    };

    /**
     * <%= Name %> middleware
     */
    exports.<%= name %>ByID = function (req, res, next, id) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.send(responseHandler.getResponseData('400'));
        }

        <%= Name %>.findById(id)
            .exec(function (err, <%= name %>) {
                if (err) {
                    return res.send(responseHandler.getMongoErrorMessage(err));
                } else if (!<%= name %>) {
                    return res.send(responseHandler.getResponseData('400'));
                }
                req.model = <%= name %>;
                next();
            });
    };

}());
