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
        // Get All users
        $api->get('/get-users', ['uses' => 'UsersController@getAllUsers','as' => 'api.user.all']);
    });
});
