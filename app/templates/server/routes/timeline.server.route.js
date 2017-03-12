/**
 *
 * Created by hygkui on 2017/3/12
 */
(function () {
    'use strict';
    var path = require('path'),
        authHelper = require(path.resolve('./config/helper/auth'));
    
    var timelineCtrl = require('../controllers/timeline.server.controller');
    
    
    module.exports = function (app) {
        
        app.route('/app/timelines')
            .all(authHelper.isAllowed)
            .get(timelineCtrl.list)
            .post(timelineCtrl.create);
        
        app.route('/app/timelines/:timelineId')
            .all(authHelper.isAllowed)
            .get(timelineCtrl.read)
            .put(timelineCtrl.update)
            .delete(timelineCtrl.delete);
        
        app.param('timelineId', timelineCtrl.timelineByID);
    };
    
    
}());