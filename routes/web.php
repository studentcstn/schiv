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

    Route::get('appointment', 'AppointmentRequestController@show');
    Route::get('appointment/{count}', 'AppointmentRequestController@show_count');
    Route::get('appointment/{from}/{to}', 'AppointmentRequestController@show_from_to');
    Route::post('appointment', 'AppointmentRequestController@store');
    Route::delete('appointment/{appointment_id}', 'AppointmentRequestController@desroy');
    
    Route::get('banned_users', 'BannedUsersController@show');
    Route::post('banned_users', 'BannedUsersController@store');
    Route::delete('banned_users/{user_id}', 'BannedUsersController@destroy');
});
