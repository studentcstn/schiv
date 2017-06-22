<?php
use App\Account;

Route::post('login', 'LoginController@login');
Route::post('logout', 'LogoutController@logout');
Route::post('reset', 'ResetPasswordController@reset');

Route::post('register', 'RegisterController@store');
Route::put('register', 'RegisterController@update');

Route::get('docents', 'DocentsController@index');
Route::get('docents/{docent_id}', 'DocentsController@show');

Route::middleware(['auth.enforce'])->group(function () {
    Route::get('appointment_request', 'AppointmentRequestController@show');
    Route::post('appointment_request', 'AppointmentRequestController@store');
    Route::delete('appointment_request/{request_id}', 'AppointmentRequestController@destroy');

    Route::get('settings', 'SettingsController@show');
    Route::put('settings', 'SettingsController@update');
});

Route::middleware(['auth.enforce','auth.docent'])->group(function() {
    Route::put('appointment_request', 'AppointmentRequestController@update');

    Route::get('appointment', 'AppointmentController@show');
    Route::get('appointment/{count}', 'AppointmentController@show_count');
    Route::get('appointment/{from}/{to}', 'AppointmentController@show_from_to');
    Route::post('appointment', 'AppointmentController@store');
    Route::delete('appointment/{appointment_id}', 'AppointmentController@destroy');

    Route::get('banned_users', 'BannedUsersController@show');
    Route::post('banned_users', 'BannedUsersController@store');
    Route::delete('banned_users/{user_id}', 'BannedUsersController@destroy');
});

Route::get('test.html', function() {
    if (App::environment('local')) {
        $accounts = Account::all();
        return view('test', ['accounts' => $accounts]);
    } else {
        abort(404);
    }
});
