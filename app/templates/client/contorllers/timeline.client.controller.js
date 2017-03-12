/**
 *
 * Created by hygkui on 2017/3/12
 */
(function () {
    'use strict';
    angular
        .module('timeline')
        .controller('TimelineController', TimelineController)
        .controller('TimelineModalController', TimelineModalController);
    
    TimelineController.$inject = ['$scope', '$http', '$uibModal', 'TimelineService'];
    
    function TimelineController($scope, $http, $modal, TimelineService) {
        $scope.currentTimeline = null;
        $scope.pageOptions = {
            page: 1,
            limit: 20
        };
        
        $scope.searchTimeline = function (isArchived) {
            $scope.currentTimeline = null;
            refresh();
        };
        
        var refresh = function () {
            var queryOptions = {
                page: $scope.pageOptions.page,
                limit: $scope.pageOptions.limit,
                searchText: $scope.searchText
            };
            
            TimelineService.query(queryOptions, function (data, headers) {
                $scope.totalItemsCount = headers()['x-total-items-count'];
                $scope.timelines = data;
                if (!$scope.timelines.length) {
                    $scope.currentTimeline = null;
                } else {
                    if (!$scope.currentTimeline) {
                        if ($scope.timelines.length) {
                            $scope.currentTimeline = $scope.timelines[0];
                        }
                    } else {
                        // update currentTimeline
                        var isMatched = $scope.timelines.some(function (item) {
                            if (item._id === $scope.currentTimeline._id) {
                                $scope.currentTimeline = item;
                                return true;
                            } else {
                                return false;
                            }
                        });
                        
                        if (!isMatched) {
                            $scope.currentTimeline = $scope.timelines[0];
                        }
                    }
                }
            });
        };
        
        $scope.selectCurrentTimeline = function (timeline) {
            $scope.currentTimeline = timeline;
        };
        
        
        $scope.addTimeline = function (timeline) {
            var model = new TimelineService(timeline);
            model.$save(function () {
                $scope.currentTimeline = null;
                $scope.refresh();
            });
        };
        
        $scope.updateTimeline = function (timeline) {
            if (timeline === null) {
                return;
            }
            TimelineService.update({id: timeline._id}, timeline, function () {
                refresh();
            });
        };
        
        $scope.deleteTimeline = function (timelineObj) {
            if (timelineObj === null) {
                return;
            }
            $scope.showConfirmMessage('CMSV_DELETE_CONFIRM', ['timeline', timelineObj.name], function () {
                var timeline = new TimelineService(timelineObj);
                timeline.$remove(function () {
                    $scope.currentTimeline = null;
                    refresh();
                });
            });
        };
        
        
        $scope.refresh = refresh;
        
        $scope.timelineActions = {
            'add': {
                text: 'Add',
                tpl: '/timeline_model',
                form: '#addTimelineForm',
                title: 'Add New Timeline',
                action: $scope.addTimeline,
                controller: 'TimelineModalController'
            },
            'update': {
                text: 'Update',
                tpl: '/timeline_model',
                form: '#addTimelineForm',
                title: 'Modify Timeline Details',
                action: $scope.updateTimeline,
                controller: 'TimelineModalController'
            }
        };
        
        $scope.selectTimeline = function (item, action) {
            if (item) {
                $scope.backupEntry = item;
                $scope.resolveTimeline = angular.copy(item);
            } else {
                $scope.resolveTimeline = {};
            }
            $scope.currentTimelineAction = $scope.timelineActions[action];
            $scope.showTimelineModal();
        };
        
        $scope.showTimelineModal = function () {
            var modalInstance = $modal.open({
                templateUrl: $scope.currentTimelineAction.tpl,
                controller: $scope.currentTimelineAction.controller,
                resolve: {
                    timeline: function () {
                        return $scope.resolveTimeline;
                    },
                    currentTimelineAction: function () {
                        return $scope.currentTimelineAction;
                    }
                },
                windowClass: 'modal-common',
                backdrop: 'static'
            });
            modalInstance.result.then(function (timeline) {
                timeline && $scope.currentTimelineAction.action(timeline);
            });
        };
    }
    
    TimelineModalController.$inject = ['$scope', '$uibModalInstance', 'timeline', 'currentTimelineAction', '$timeout'];
    
    function TimelineModalController($scope, $modalInstance, timeline, currentTimelineAction, $timeout) {
        $scope.timeline = timeline;
        $scope.currentTimelineAction = currentTimelineAction;
        
        $scope.operateTimeline = function () {
            $modalInstance.close($scope.timeline);
        };
        
        $scope.toInt = function (a) {
            return parseInt(a, 10) * 100;
        };
    }
}());