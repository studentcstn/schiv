<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller {
    public function login(Request $request) {
        var_dump($request->all());
        if (!$request->has('email') || !$request->has('password')) {
            return response()->json(['reason' => 1], 401);
        }
        $email = $request->input('email');
        $password = $request->input('password');
        var_dump($email);
        var_dump($password);
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            $request->session()->put('login_account_id', Auth::user()->id);
            return response()->json(['messages' => [["login successful"]]]);
        } else {
            return response()->json(['reason' => 2], 401);
        }
    }
}
