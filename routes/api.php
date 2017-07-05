<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
$api = app('Dingo\Api\Routing\Router');
$api->version('v1', function ($api) {
    $api->post('/login', 'App\Http\Controllers\ApiController@authenticate');
    $api->post('/register', 'App\Http\Controllers\ApiController@register');

    $api->get('/hosts','App\Http\Controllers\OtherSystem\HostController@hosts');
    $api->get('/hosts/{id}','App\Http\Controllers\OtherSystem\HostController@hostDetail');
    $api->get('/hostsearch/{keyword}','App\Http\Controllers\OtherSystem\HostController@hostSearch');
    $api->get('/hosts/{ids}/get','App\Http\Controllers\OtherSystem\HostController@manyHost');

    $api->group(['middleware' => 'jwt.auth'], function ($api) {
        $api->get('/myhost','App\Http\Controllers\OtherSystem\HostController@myHost');
        $api->post('/hosts/','App\Http\Controllers\OtherSystem\HostController@createHost');
        $api->patch('/hosts/{id}','App\Http\Controllers\OtherSystem\HostController@editHost');
        $api->delete('/hosts/{id}','App\Http\Controllers\OtherSystem\HostController@delHost');
        $api->delete('/hostdetails/{id}','App\Http\Controllers\OtherSystem\HostController@delHostDetail');
    });
});