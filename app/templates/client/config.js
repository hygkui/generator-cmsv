/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function () {
    'use strict';
    // Setting up angular routes
    angular
        .module('dashboard.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('dashboard.<%= name %>', {
                url: 'dashboard/<%= name %>',
                templateUrl: 'modules/<%= name %>/client/views/<%= name %>.client.view.html',
                controller: '<%= Name %>Controller',
                data: {
                    pageTitle: 'Dashboard-<%= Name %>s',
                    roles: ['admin', 'superuser']
                }
            });
    }
}());
