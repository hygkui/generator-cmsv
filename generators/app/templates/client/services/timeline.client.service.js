/**
 *
 * Created by hygkui on 2017/3/12
 */
(function () {
    'use strict';
    angular
          .module('timeline.services')
          .factory('TimelineService', TimelineService);
      
    TimelineService.$inject = ['$resource'];
    
    function TimelineService($resource) {
      return $resource('app/timelines/:timelineId', {
          timelineId: '@_id'
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