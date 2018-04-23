<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$api = $app->make(Dingo\Api\Routing\Router::class);

$api->version('v1', function ($api) {
    $api->post('/auth/login', [
        'as' => 'api.auth.login',
        'uses' => 'App\Http\Controllers\Auth\AuthController@postLogin',
    ]);

    $api->get('/auth/login2', [
        'as' => 'api.auth.test',
        'uses' => 'App\Http\Controllers\Auth\AuthController@test',
    ]);

    /*************************************************************
     * Authunticaion routes
     ************************************************************/
    $api->group([
        'middleware' => 'api.auth',
    ], function ($api) {
        $api->get('/', [
            'uses' => 'App\Http\Controllers\APIController@getIndex',
            'as' => 'api.index'
        ]);
        $api->get('/auth/user', [
            'uses' => 'App\Http\Controllers\Auth\AuthController@getUser',
            'as' => 'api.auth.user'
        ]);
        $api->patch('/auth/refresh', [
            'uses' => 'App\Http\Controllers\Auth\AuthController@patchRefresh',
            'as' => 'api.auth.refresh'
        ]);
        $api->delete('/auth/invalidate', [
            'uses' => 'App\Http\Controllers\Auth\AuthController@deleteInvalidate',
            'as' => 'api.auth.invalidate'
        ]);
    });

    /*************************************************************
     * Dashboard controller routes
     ************************************************************/
    $api->group([
        'middleware' => 'api.auth',
        'prefix'     => '/dashboard/',
        'namespace'  => 'App\Http\Controllers\Dashboard',
    ], function ($api) {
        // Get All completed tasks count
        $api->get('/get-all-completed-tasks-count',
            [
                'uses' => 'DashboardController@getCompletedTasksCount',
                'as' => 'api.dashboard.get-all-completed-tasks-count',
                'middleware' => ['permission:dashboard_view']
            ]
        );
        // Get All uncompleted tasks count
        $api->get('/get-all-uncompleted-tasks-count',
            [
                'uses' => 'DashboardController@getUncompletedTasksCount',
                'as' => 'api.dashboard.get-all-uncompleted-tasks-count',
                'middleware' => ['permission:dashboard_view']
            ]
        );
        // Get user completed tasks count
        $api->get('/get-user-completed-tasks-count/{id}',
            [
                'uses' => 'DashboardController@getUserCompletedTasksCount',
                'as' => 'api.dashboard.get-user-completed-tasks-count',
                'middleware' => ['permission:dashboard_view']
            ]
        );
        // Get user uncompleted tasks count
        $api->get('/get-user-uncompleted-tasks-count/{id}',
            [
                'uses' => 'DashboardController@getUserUncompletedTasksCount',
                'as' => 'api.dashboard.get-user-uncompleted-tasks-count',
                'middleware' => ['permission:dashboard_view']
            ]
        );
        // Get last tasks
        $api->get('/get-last-tasks',
            [
                'uses' => 'DashboardController@getLastTasks',
                'as' => 'api.dashboard.get-last-tasks',
                'middleware' => ['permission:dashboard_view']
            ]
        );

        // Get last tasks for a user
        $api->get('/get-user-last-tasks/{id}',
            [
                'uses' => 'DashboardController@getUserLastTasks',
                'as' => 'api.dashboard.get-user-last-tasks',
                'middleware' => ['permission:dashboard_view']
            ]
        );
    });

    /*************************************************************
     * Users controller routes
     ************************************************************/
    $api->group([
        'middleware' => 'api.auth',
        'prefix'     => '/users/',
        'namespace'  => 'App\Http\Controllers\Users',
    ], function ($api) {
        // Get role object
        $api->get('/get-role-by-id/{id}',
            [
                'uses' => 'RolesController@getUserRole',
                'as' => 'api.user.role',
                'middleware' => ['permission:user_view']
            ]);
        $api->get('/get-user-permissions/{id}',
            [
                'uses' => 'RolesController@getUserPermissions',
                'as' => 'api.user.permissions'
            ]
        );
        $api->get('/get-roles',
            [
                'uses' => 'RolesController@getAllRoles',
                'as' => 'api.roles.all',
                'middleware' => ['permission:user_role_view']
            ]
        );
        // add new user
        $api->post('/add-user', 
            [
                'uses' => 'UsersController@addNewUser',
                'as' => 'api.user.addNew',
                'middleware' => ['permission:user_add']
            ]
        );
        // update existing user
        $api->post('/update-user',
            [
                'uses' => 'UsersController@updateExistingUser',
                'as' => 'api.user.updateExisting',
                'middleware' => ['permission:user_update']
            ]
        );
        // Upload image
        $api->post('/upload-image',
            [
                'uses' => 'UsersController@uploadUserPicture',
                'as' => 'api.user.uploadUserPicture',
                'middleware' => ['permission:user_add|user_update']
            ]
        );
        // delete a user
        $api->post('/delete-user',
            [
                'uses' => 'UsersController@deleteExistingUser',
                'as' => 'api.user.deleteExistingUser',
                'middleware' => ['permission:user_delete']
            ]
        );
        // updateBlockStatus a user
        $api->post('/update-user-block-status',
            [
                'uses' => 'UsersController@updateBlockStatus',
                'as' => 'api.user.block-user',
                'middleware' => ['permission:user_block']
            ]
        );
        // Get All users
        $api->get('/get-users',
            [
                'uses' => 'UsersController@getAllUsers',
                'as' => 'api.user.all',
                'middleware' => ['permission:user_view|user_list_view']
            ]
        );
    });

    /*************************************************************
     * Roles controller routes
     ************************************************************/
    $api->group([
        'middleware' => 'api.auth',
        'prefix'     => '/roles/',
        'namespace'  => 'App\Http\Controllers\Users',
    ], function ($api) {
        // get all roles
        $api->get('/get-roles',
            [
                'uses' => 'RolesController@getAllRoles',
                'as' => 'api.role.get-roles',
                'middleware' => ['permission:user_role_view']
            ]
        );
        $api->get('/get-permissions',
            [
                'uses' => 'RolesController@getAllPermissions',
                'as' => 'api.role.get-permissions',
                'middleware' => ['permission:user_permission_view']
            ]
        );
        // add new role
        $api->post('/add-role',
            [
                'uses' => 'RolesController@createNewRole',
                'as' => 'api.role.add-role',
                'middleware' => ['permission:user_role_add']
            ]
        );
        $api->post('/edit-role',
            [
                'uses' => 'RolesController@UpdateExistingRole',
                'as' => 'api.role.edit-role',
                'middleware' => ['permission:user_role_edit']
            ]
        );
        // add new permission
        $api->post('/add-permission',
            [
                'uses' => 'RolesController@createNewPermission',
                'as' => 'api.role.add-permission',
                'middleware' => ['permission:user_permission_add']
            ]
        );
    });

    /*************************************************************
     * Tasks controller routes
     ************************************************************/
    $api->group([
        'middleware' => 'api.auth',
        'prefix'     => '/tasks/',
        'namespace'  => 'App\Http\Controllers\Tasks',
    ], function ($api) {
        // add new task
        $api->post('/add-task',
            [
                'uses' => 'TasksController@addNewTask',
                'as' => 'api.task.addNew',
                'middleware' => ['permission:task_add']
            ]
        );
        // update existing task
        $api->post('/update-task',
            [
                'uses' => 'TasksController@updateExistingTask',
                'as' => 'api.task.updateExisting'
            ]
        );

        // update existing task progress
        $api->post('/update-task-progress',
            [
                'uses' => 'TasksController@updateExistingTask',
                'as' => 'api.task.updateExisting'
            ]
        );
        // delete a user
        $api->post('/delete-task',
            [
                'uses' => 'TasksController@deleteExistingTask',
                'as' => 'api.task.deleteExisting',
                'middleware' => ['permission:task_delete']
            ]
        );
        // Get All tasks
        $api->get('/get-tasks',
            [
                'uses' => 'TasksController@getAllTasks',
                'as' => 'api.task.all',
                'middleware' => ['permission:task_view']
            ]
        );
        // Get all completed tasks
        $api->get('/get-completed-tasks',
            [
                'uses' => 'TasksController@getCompletedTasks',
                'as' => 'api.task.all.completed',
                'middleware' => ['permission:task_view']
            ]
        );
        // Get all uncompleted tasks
        $api->get('/get-uncompleted-tasks',
            [
                'uses' => 'TasksController@getUncompletedTasks',
                'as' => 'api.task.all.uncompleted',
                'middleware' => ['permission:task_view']
            ]
        );
        // Upload image
        $api->post('/upload-attachment',
            [
                'uses' => 'TasksController@UploadAttachment',
                'as' => 'api.task.upload-attachment',
                'middleware' => ['permission:task_add|task_update']
            ]
        );

    });

    /*************************************************************
     * Notifications controller routes
     ************************************************************/
    $api->group([
        'middleware' => 'api.auth',
        'prefix'     => '/notifications/',
        'namespace'  => 'App\Http\Controllers\Notifications',
    ], function ($api) {
        // add new task
        $api->post('/add-Notification', ['uses' => 'NotificationsController@addNewNotification','as' => 'api.Notification.addNew']);
        // update existing user
        $api->post('/update-notification', ['uses' => 'NotificationsController@updateExistingNotification','as' => 'api.Notification.updateExisting']);
        //send notification to use
        $api->post('/send-notification', ['uses' => 'NotificationsController@sendSingleNotification','as' => 'api.Notification.sendSingleNotification']);
        // Get All Notifications for a user
        $api->get('/get-user-notifications/{user_id}', ['uses' => 'NotificationsController@getUserNotifications','as' => 'api.Notification.all']);
    });

    /*************************************************************
     * Mailbox controller routes
     ************************************************************/
    $api->group([
        'middleware' => 'api.auth',
        'prefix'     => '/mailbox/',
        'namespace'  => 'App\Http\Controllers\Mailbox',
    ], function ($api) {
        // add new task
        $api->post('/send-mail',
            [
                'uses' => 'MailboxController@sendNewEmail',
                'as' => 'api.mailbox.send-mail',
                'middleware' => ['permission:mail_compose']
            ]
        );
        $api->get('/get-user-mails/{user_id}',
            [
                'uses' => 'MailboxController@getUserMails',
                'as' => 'api.mailbox.get-user-mails',
                'middleware' => ['permission:mail_view']
            ]
        );
        $api->get('/get-user-inbox/{user_id}',
            [
                'uses' => 'MailboxController@getUserInbox',
                'as' => 'api.mailbox.get-user-inbox',
                'middleware' => ['permission:mail_view']
            ]
        );
        $api->get('/get-user-outbox/{user_id}',
            [
                'uses' => 'MailboxController@getUserOutbox',
                'as' => 'api.mailbox.get-user-outbox',
                'middleware' => ['permission:mail_view']
            ]
        );
        $api->get('/get-user-inbox-starred/{user_id}',
            [
                'uses' => 'MailboxController@getUserInboxStarred',
                'as' => 'api.mailbox.get-user-inbox-starred',
                'middleware' => ['permission:mail_view']
            ]
        );
        $api->get('/get-user-inbox-trash/{user_id}',
            [
                'uses' => 'MailboxController@getUserInboxTrash',
                'as' => 'api.mailbox.get-user-inbox-trash',
                'middleware' => ['permission:mail_view']
            ]
        );
        $api->put('/set-mail-read-status',
            [
                'uses' => 'MailboxController@setMailStatus',
                'as' => 'api.mailbox.set-mail-status',
                'middleware' => ['permission:mail_view']
            ]
        );
        $api->put('/set-mail-star-status',
            [
                'uses' => 'MailboxController@setMailStarStatus',
                'as' => 'api.mailbox.set-mail-star-status',
                'middleware' => ['permission:mail_view']
            ]
        );
        $api->put('/set-mail-trash-status',
            [
                'uses' => 'MailboxController@setMailTrashStatus',
                'as' => 'api.mailbox.set-mail-trash-status',
                'middleware' => ['permission:mail_view']
            ]
        );
    });
});
