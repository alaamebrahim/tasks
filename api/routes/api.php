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
     * Users controller routes
     ************************************************************/
    $api->group([
        'middleware' => 'api.auth',
        'prefix'     => '/users/',
        'namespace'  => 'App\Http\Controllers\Users',
    ], function ($api) {
        // Get role object
        $api->get('/get-role-by-id/{id}', ['uses' => 'RolesController@getUserRole','as' => 'api.user.role']);
        $api->get('/get-roles', ['uses' => 'RolesController@getAllRoles','as' => 'api.roles.all']);
        // add new user
        $api->post('/add-user', ['uses' => 'UsersController@addNewUser','as' => 'api.user.addNew']);
        // update existing user
        $api->post('/update-user', ['uses' => 'UsersController@updateExistingUser','as' => 'api.user.updateExisting']);
        // Upload image
        $api->post('/upload-image', ['uses' => 'UsersController@uploadUserPicture','as' => 'api.user.uploadUserPicture']);
        // delete a user
        $api->post('/delete-user', ['uses' => 'UsersController@deleteExistingUser','as' => 'api.user.deleteExistingUser']);
        // Get All users
        $api->get('/get-users', ['uses' => 'UsersController@getAllUsers','as' => 'api.user.all']);
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
        $api->post('/add-task', ['uses' => 'TasksController@addNewTask','as' => 'api.task.addNew']);
        // update existing user
        $api->post('/update-task', ['uses' => 'TasksController@updateExistingTask','as' => 'api.task.updateExisting']);
        // delete a user
        $api->post('/delete-task', ['uses' => 'TasksController@deleteExistingTask','as' => 'api.task.deleteExisting']);
        // Get All tasks
        $api->get('/get-tasks', ['uses' => 'TasksController@getAllTasks','as' => 'api.task.all']);
        // Get all completed tasks
        $api->get('/get-completed-tasks', ['uses' => 'TasksController@getCompletedTasks','as' => 'api.task.all.completed']);
        // Get all uncompleted tasks
        $api->get('/get-uncompleted-tasks', ['uses' => 'TasksController@getUncompletedTasks','as' => 'api.task.all.uncompleted']);
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
        $api->post('/send-mail', ['uses' => 'MailboxController@sendNewEmail','as' => 'api.mailbox.send-mail']);
        $api->get('/get-user-mails/{user_id}', ['uses' => 'MailboxController@getUserMails','as' => 'api.mailbox.get-user-mails']);
        $api->get('/get-user-inbox/{user_id}', ['uses' => 'MailboxController@getUserInbox','as' => 'api.mailbox.get-user-inbox']);
        $api->get('/get-user-outbox/{user_id}', ['uses' => 'MailboxController@getUserOutbox','as' => 'api.mailbox.get-user-outbox']);
        $api->get('/get-user-inbox-starred/{user_id}', ['uses' => 'MailboxController@getUserInboxStarred','as' => 'api.mailbox.get-user-inbox-starred']);
        $api->get('/get-user-inbox-trash/{user_id}', ['uses' => 'MailboxController@getUserInboxTrash','as' => 'api.mailbox.get-user-inbox-trash']);
        $api->put('/set-mail-read-status', ['uses' => 'MailboxController@setMailStatus','as' => 'api.mailbox.set-mail-status']);
        $api->put('/set-mail-star-status', ['uses' => 'MailboxController@setMailStarStatus','as' => 'api.mailbox.set-mail-star-status']);
        $api->put('/set-mail-trash-status', ['uses' => 'MailboxController@setMailTrashStatus','as' => 'api.mailbox.set-mail-trash-status']);
    });
});
