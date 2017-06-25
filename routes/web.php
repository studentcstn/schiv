<?php
use App\Account;

Route::get('/', function () {
    return redirect('index.html');
});

Route::get('test.html', function() {
    if (App::environment('local')) {
        return view('test', ['accounts' => Account::all()]);
    } else {
        abort(404);
    }
});
