/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function () {
    'use strict';
    angular
          .module('<%= name %>.services')
          .factory('<%= Name %>Service', <%= Name %>Service);

    <%= Name %>Service.$inject = ['$resource'];

    function <%= Name %>Service($resource) {
      return $resource('app/<%= name %>s/:<%= name %>Id', {
          <%= name %>Id: '@_id'
      }, {
          update: {
              method: 'PUT'
          },
          query: {
              method: 'GET',
              isArray: true
          }
      });
    }
}());
