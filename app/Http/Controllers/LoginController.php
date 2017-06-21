<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller {
    //todo return information: student or docent
    public function login(Request $request) {
        $this->validate($request, [
            'email' => 'required|email', 'password' => 'required',
        ]);

        if (Auth::validate($request->only(['email', 'password']))) {
            $account = Auth::getLastAttempted();
            if ($account->active) {
                $request->session()->put('login_account_id', $account->id);
                return response()->json(['message' => "login successful"]);
            } else {
                $reason = "account must be active";
            }
        } else {
            $reason = "login unsuccessful";
        }

        return response()->json(['message' => $reason], 401);
    }
}
