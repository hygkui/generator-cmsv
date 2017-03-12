/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function () {
    'use strict';
    var path = require('path'),
        authHelper = require(path.resolve('./config/helper/auth'));

    var <%= name %>Ctrl = require('../controllers/<%= name %>.server.controller');


    module.exports = function (app) {

        app.route('/app/<%= name %>s')
            .all(authHelper.isAllowed)
            .get(<%= name %>Ctrl.list)
            .post(<%= name %>Ctrl.create);

        app.route('/app/<%= name %>s/:<%= name %>Id')
            .all(authHelper.isAllowed)
            .get(<%= name %>Ctrl.read)
            .put(<%= name %>Ctrl.update)
            .delete(<%= name %>Ctrl.delete);

        app.param('<%= name %>Id', <%= name %>Ctrl.<%= name %>ByID);
    };


}());
