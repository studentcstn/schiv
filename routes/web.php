<?php
Route::get('/', function () {
    return view('index');
});

Route::post('register', 'RegisterController@store');
Route::put('register', 'RegisterController@update');

Route::get('docents', 'DocentsController@index');
Route::get('docents/{docent_id}', 'DocentsController@show');

Route::get('{user_id}/appointment_request', 'AppointmentRequestController@show');
Route::post('{user_id}/appointment_request', 'AppointmentRequestController@store');
Route::put('{docent_id}/appointment_request', 'AppointmentRequestController@update');
Route::delete('{user_id}/appointment_request/{request_id}', 'AppointmentRequestController@destroy');

Route::middleware(['auth.once.basic'])->group(function () {
    Route::post('login', function() {});
    Route::get('settings', 'SettingsController@show');
    Route::put('settings', 'SettingsController@update');
});
Route::middleware(['auth.once.basic'])->group(function() {
    Route::get('banned_users', 'BannedUsersController@show');
    Route::post('banned_users', 'BannedUsersController@store');
    Route::delete('banned_users/{user_id}', 'BannedUsersController@destroy');
});
