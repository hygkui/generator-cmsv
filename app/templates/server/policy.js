/**
 * Created by <%= user %><<%= email %>> on <%= date %>
 */
(function () {
    'use strict';

    /**
     * Invoke <%= Name %> Routes Permissions
     */
    exports.invokeRolesPolicies = function (acl) {
        // Internal Routes for Staff
        acl.allow([{
            roles: ['superuser', 'admin'],
            allows: [{
                resources: [
                    '/app/<%= name %>s',
                    '/app/<%= name %>s/:<%= name %>Id'
                ],
                permissions: ['*']
            }]
        }]);

        // Public API Routes for User or Guest.
        acl.allow([{
            roles: ['user'],
            allows: [{
                resources: [
                    '/<%= name %>s',
                    '/<%= name %>s/:<%= name %>Id'
                ],
                permissions: ['get']
            }]
        }]);
    };
}());
