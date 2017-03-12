/**
 *
 * Created by hygkui on 2017/3/12
 */
(function () {
    'use strict';

      app.registerModule('<%= name %>', ['flow', 'core']);
      app.registerModule('<%= name %>.services');
      app.registerModule('<%= name %>.routes', ['ui.router']);

}(ApplicationConfiguration));
