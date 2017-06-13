<?php
Route::get('/', function () {
    return view('index');
});

// Route::post('register', function () {});
// Route::put('register', function ($token) {});

// Route::post('appointment', 'AppointmentController');
// Route::delete('appointment/{appointment_id}', 'AppointmentController');

// Route::get('{user_id}/appointment', 'AppointmentController');
// Route::get('{user_id}/appointment/{from}/{to}', 'AppointmentController');

Route::get('{user_id}/settings', 'SettingsController@show');
Route::put('{user_id}/settings', 'SettingsController@update');
