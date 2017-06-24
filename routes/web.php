<?php
use App\Account;

Route::post('login', 'LoginController@login');
Route::post('logout', 'LogoutController@logout');
Route::put('reset', 'ResetPasswordController@reset');

Route::post('register', 'RegisterController@store');
Route::put('register', 'RegisterController@update');

Route::get('docents', 'DocentController@index');
Route::get('docents/{docent_id}', 'DocentController@show');

Route::middleware(['auth.enforce'])->group(function () {
    Route::get('appointment_requests', 'AppointmentRequestController@show');
    Route::post('appointment_requests', 'AppointmentRequestController@store');
    Route::delete('appointment_requests/{request_id}', 'AppointmentRequestController@destroy');

    Route::get('settings', 'SettingController@show');
    Route::put('settings', 'SettingController@update');
});

Route::middleware(['auth.enforce','auth.docent'])->group(function() {
    Route::put('appointment_requests', 'AppointmentRequestController@update');

    Route::get('appointments', 'AppointmentController@show');
    Route::get('appointments/{count}', 'AppointmentController@showCount');
    Route::get('appointments/{from}/{to}', 'AppointmentController@showFromTo');
    Route::post('appointments', 'AppointmentController@store');
    Route::delete('appointments/{appointment_id}', 'AppointmentController@destroy');

    Route::get('account_bans', 'AccountBanController@show');
    Route::post('account_bans', 'AccountBanController@store');
    Route::delete('account_bans/{user_id}', 'AccountBanController@destroy');
});

Route::get('test.html', function() {
    if (App::environment('local')) {
        return view('test', ['accounts' => Account::all()]);
    } else {
        abort(404);
    }
});
