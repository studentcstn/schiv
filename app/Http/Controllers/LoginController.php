<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller {
    public function login(Request $request) {
        $this->validate($request, [
            'email' => 'required|email', 'password' => 'required',
        ]);

        if (Auth::validate($request->only(['email', 'password']))) {
            $account = Auth::getLastAttempted();
            $account->last_login_at = date("Y-m-d H:i:s");
            $account->save();
            if ($account->active) {
                $request->session()->put('login_account_id', $account->id);
                Auth::login($account);
                return response()->json([
                    "message" => "login successful",
                    "account" => [
                        'id' => $account->id,
                        'email' => $account->email,
                        'type' =>  $account->type,
                        'last_login_at' => $account->last_login_at
                    ]
                ]);
            } else {
                $reason = "account must be active";
            }
        } else {
            $reason = "login unsuccessful";
        }

        return response()->json(['message' => $reason], 401);
    }
}
