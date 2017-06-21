<?php
Route::get('/', function () {
    return view('index');
});

Route::post('register', 'RegisterController@store');
Route::put('register', 'RegisterController@update');

Route::get('docents', 'DocentsController@index');
Route::get('docents/{docent_id}', 'DocentsController@show');

Route::middleware(['auth.once.basic'])->group(function () {
    Route::post('login', function() {});

    Route::get('appointment_request', 'AppointmentRequestController@show');
    Route::post('appointment_request', 'AppointmentRequestController@store');
    Route::delete('appointment_request/{request_id}', 'AppointmentRequestController@destroy');

    Route::get('settings', 'SettingsController@show');
    Route::put('settings', 'SettingsController@update');
});
Route::middleware(['auth.once.basic','auth.docent'])->group(function() {
    Route::put('appointment_request', 'AppointmentRequestController@update');

    Route::get('banned_users', 'BannedUsersController@show');
    Route::post('banned_users', 'BannedUsersController@store');
    Route::delete('banned_users/{user_id}', 'BannedUsersController@destroy');
});
