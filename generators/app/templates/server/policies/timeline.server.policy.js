/**
 *
 * Created by hygkui on 2017/3/12
 */
(function () {
    'use strict';
    
    /**
     * Invoke Timeline Routes Permissions
     */
    exports.invokeRolesPolicies = function (acl) {
        // Internal Routes for Staff
        acl.allow([{
            roles: ['superuser', 'admin'],
            allows: [{
                resources: [
                    '/app/timelines',
                    '/app/timelines/:timelineId'
                ],
                permissions: ['*']
            }]
        }]);
        
        // Public API Routes for User or Guest.
        acl.allow([{
            roles: ['user'],
            allows: [{
                resources: [
                    '/timelines',
                    '/timelines/:timelineId'
                ],
                permissions: ['get']
            }]
        }]);
    };
}());