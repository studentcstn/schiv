<?php
Route::get('/', function () {
    return view('index');
});

Route::post('register', 'RegisterController@store');
Route::put('register', 'RegisterController@update');

Route::get('docents', 'DocentsController@index');
Route::get('docents/{docent_id}', 'DocentsController@show');

Route::middleware(['auth.once.basic'])->group(function () {
    Route::get('{user_id}/settings', 'SettingsController@show');
    Route::put('{user_id}/settings', 'SettingsController@update');
});
Route::middleware(['auth.once.basic'])->group(function() {
    Route::get('{docent_id}/banned_users', 'BannedUsersController@show');
    Route::post('{docent_id}/banned_users', 'BannedUsersController@store');
    Route::delete('{docent_id}/banned_users/{user_id}', 'BannedUsersController@destroy');
});
