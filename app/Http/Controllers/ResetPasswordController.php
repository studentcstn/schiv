<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;

use App\Account;
use App\Mail\Reactivate;

class ResetPasswordController extends Controller {
    public function reset(Request $request) {
        $this->validate($request, [
            'email' => 'email|required'
        ]);
        $account = Account::where('email', $request->input('email'))
            ->first();

        if (!$account) {
            return response()->json(['message' => "account doesn't exists"], 404);
        }

        $newPassword = str_random(10);

        $account->active = false;
        $account->password = Hash::make($newPassword);
        $account->save();

        $debug = Config::get('app.debug');
        $token = $this->generateToken($account);

        Mail::to($account->email)
            ->send(new Reactivate($token, $newPassword));

        if ($debug) {
            return response()->json([
                'token' => $token,
                'password' => $newPassword,
            ]);
        } else {
            return response()->json([]);
        }
    }
}
