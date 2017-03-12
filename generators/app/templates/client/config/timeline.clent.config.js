/**
 *
 * Created by hygkui on 2017/3/12
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
            .state('dashboard.timeline', {
                url: 'dashboard/timeline',
                templateUrl: 'modules/timeline/client/views/timeline.client.view.html',
                controller: 'TimelineController',
                data: {
                    pageTitle: 'Dashboard-Timelines',
                    roles: ['admin', 'superuser']
                }
            });
    }
}());