/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function(){
  'use strict';

  var path = require('path');
  var <%= name %>Ctrl = require('../controllers/<%= name %>.server.controller');
  var authHelper = require(path.resolve('./config/helper/auth'));
  var express = require('express');
  var router = express.Router();

  router.get('/<%= name %>s', authHelper.isAuthAllowed, <%= name %>Ctrl.list);
  router.get('/<%= name %>s/:<%= name %>Id', authHelper.isAuthAllowed, <%= name %>Ctrl.read);
  router.param('<%= name %>Id', <%= name %>Ctrl.<%= name %>ByID);

  module.exports = router;

}())

