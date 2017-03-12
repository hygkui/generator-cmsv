/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function () {
    'use strict';

      app.registerModule('<%= name %>', ['flow', 'core']);
      app.registerModule('<%= name %>.services');
      app.registerModule('<%= name %>.routes', ['ui.router']);

}(ApplicationConfiguration));
