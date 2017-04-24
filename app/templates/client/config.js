/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function () {
    'use strict';
    // Setting up angular routes
    angular
        .module('master.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('master.<%= name %>', {
                url: '<%= name %>',
                templateUrl: 'modules/<%= name %>/client/views/<%= name %>.client.view.html',
                controller: '<%= Name %>Controller',
                data: {
                    pageTitle: 'Dashboard-<%= Name %>s',
                    roles: ['admin', 'superuser']
                }
            });
    }
}());
