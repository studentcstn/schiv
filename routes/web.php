<?php
Route::get('/', function () {
    return view('index');
});

Route::post('login', function () {});

Route::post('register', function () {});

Route::get('register/{token}', function ($token) {});

Route::get('dozenten', function () {});

Route::post('appointment/inscribe', 'InscribeController');

Route::post('appointment/set', 'AppointmentController');
Route::delete('appointment/{appointment_id}', 'AppointmentController');

Route::get('appointment/{user_id}', //todo);
Route::get('appointment/{user_id}/past', //todo);
Route::get('appointment/{user_id}/past/{from}/{to}', //todo);

Route::get('settings/{user_id}', //todo);
Route::put('settings', //todo);