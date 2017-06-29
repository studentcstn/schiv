<?php
use Illuminate\Http\Request;

Route::put('login', 'LoginController@login');
Route::put('reset', 'ResetPasswordController@reset');

Route::post('register', 'RegisterController@store');
Route::put('register', 'RegisterController@update');

Route::get('docents', 'DocentController@index');
Route::get('docents/{docent_id}', 'DocentController@show');

Route::middleware(['auth.enforce'])->group(function () {
    Route::put('logout', 'LogoutController@logout');

    Route::get('appointment_requests', 'AppointmentRequestController@show');
    Route::get('appointment_requests/past', 'AppointmentRequestController@showPast');
    Route::post('appointment_requests', 'AppointmentRequestController@store');
    Route::delete('appointment_requests/{id}', 'AppointmentRequestController@destroy');

    Route::get('holidays/{from}/{to}', 'HolidayController@show');

    Route::get('settings', 'SettingController@show');
    Route::put('settings', 'SettingController@update');
});

Route::middleware(['auth.enforce','auth.docent'])->group(function() {
    Route::put('appointment_requests', 'AppointmentRequestController@update');

    Route::get('appointments', 'AppointmentController@show');
    Route::get('appointments/past', 'AppointmentController@showPast');
    Route::post('appointments', 'AppointmentController@store');
    Route::delete('appointments/{id}', 'AppointmentController@destroy');

    Route::post('holidays', 'HolidayController@store');
    Route::put('holidays', 'HolidayController@update');
    Route::delete('holidays/{id}', 'HolidayController@destroy');

    Route::get('account_bans', 'AccountBanController@show');
    Route::post('account_bans', 'AccountBanController@store');
    Route::delete('account_bans/{user_id}', 'AccountBanController@destroy');
});
