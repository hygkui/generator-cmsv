/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function () {
    'use strict';
    angular
        .module('<%= name %>')
        .controller('<%= Name %>Controller', <%= Name %>Controller)
        .controller('<%= Name %>ModalController', <%= Name %>ModalController);

    <%= Name %>Controller.$inject = ['$scope', '$http', '$uibModal', '<%= Name %>Service'];

    function <%= Name %>Controller($scope, $http, $modal, <%= Name %>Service) {
        $scope.current<%= Name %> = null;
        $scope.pageOptions = {
            page: 1,
            limit: 20
        };

        $scope.search<%= Name %> = function (isArchived) {
            $scope.current<%= Name %> = null;
            refresh();
        };

        var refresh = function () {
            var queryOptions = {
                page: $scope.pageOptions.page,
                limit: $scope.pageOptions.limit,
                searchText: $scope.searchText
            };

            <%= Name %>Service.query(queryOptions, function (data, headers) {
                $scope.totalItemsCount = headers()['x-total-items-count'];
                $scope.<%= name %>s = data;
                if (!$scope.<%= name %>s.length) {
                    $scope.current<%= Name %> = null;
                } else {
                    if (!$scope.current<%= Name %>) {
                        if ($scope.<%= name %>s.length) {
                            $scope.current<%= Name %> = $scope.<%= name %>s[0];
                        }
                    } else {
                        // update current<%= Name %>
                        var isMatched = $scope.<%= name %>s.some(function (item) {
                            if (item._id === $scope.current<%= Name %>._id) {
                                $scope.current<%= Name %> = item;
                                return true;
                            } else {
                                return false;
                            }
                        });

                        if (!isMatched) {
                            $scope.current<%= Name %> = $scope.<%= name %>s[0];
                        }
                    }
                }
            });
        };

        $scope.selectCurrent<%= Name %> = function (<%= name %>) {
            $scope.current<%= Name %> = <%= name %>;
        };


        $scope.add<%= Name %> = function (<%= name %>) {
            var model = new <%= Name %>Service(<%= name %>);
            model.$save(function () {
                $scope.current<%= Name %> = null;
                $scope.refresh();
            });
        };

        $scope.update<%= Name %> = function (<%= name %>) {
            if (<%= name %> === null) {
                return;
            }
            <%= Name %>Service.update({id: <%= name %>._id}, <%= name %>, function () {
                refresh();
            });
        };

        $scope.delete<%= Name %> = function (<%= name %>Obj) {
            if (<%= name %>Obj === null) {
                return;
            }
            $scope.showConfirmMessage('CMSV_DELETE_CONFIRM', ['<%= name %>', <%= name %>Obj.name], function () {
                var <%= name %> = new <%= Name %>Service(<%= name %>Obj);
                <%= name %>.$remove(function () {
                    $scope.current<%= Name %> = null;
                    refresh();
                });
            });
        };


        $scope.refresh = refresh;

        $scope.<%= name %>Actions = {
            'add': {
                text: 'Add',
                tpl: '/<%= name %>_model',
                form: '#add<%= Name %>Form',
                title: 'Add New <%= Name %>',
                action: $scope.add<%= Name %>,
                controller: '<%= Name %>ModalController'
            },
            'update': {
                text: 'Update',
                tpl: '/<%= name %>_model',
                form: '#add<%= Name %>Form',
                title: 'Modify <%= Name %> Details',
                action: $scope.update<%= Name %>,
                controller: '<%= Name %>ModalController'
            }
        };

        $scope.select<%= Name %> = function (item, action) {
            if (item) {
                $scope.backupEntry = item;
                $scope.resolve<%= Name %> = angular.copy(item);
            } else {
                $scope.resolve<%= Name %> = {};
            }
            $scope.current<%= Name %>Action = $scope.<%= name %>Actions[action];
            $scope.show<%= Name %>Modal();
        };

        $scope.show<%= Name %>Modal = function () {
            var modalInstance = $modal.open({
                templateUrl: $scope.current<%= Name %>Action.tpl,
                controller: $scope.current<%= Name %>Action.controller,
                resolve: {
                    <%= name %>: function () {
                        return $scope.resolve<%= Name %>;
                    },
                    current<%= Name %>Action: function () {
                        return $scope.current<%= Name %>Action;
                    }
                },
                windowClass: 'modal-common',
                backdrop: 'static'
            });
            modalInstance.result.then(function (<%= name %>) {
                <%= name %> && $scope.current<%= Name %>Action.action(<%= name %>);
            });
        };
    }

    <%= Name %>ModalController.$inject = ['$scope', '$uibModalInstance', '<%= name %>', 'current<%= Name %>Action', '$timeout'];

    function <%= Name %>ModalController($scope, $modalInstance, <%= name %>, current<%= Name %>Action, $timeout) {
        $scope.<%= name %> = <%= name %>;
        $scope.current<%= Name %>Action = current<%= Name %>Action;

        $scope.operate<%= Name %> = function () {
            $modalInstance.close($scope.<%= name %>);
        };

        $scope.toInt = function (a) {
            return parseInt(a, 10) * 100;
        };
    }
}());
