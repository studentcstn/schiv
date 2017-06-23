<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Config;

use App\Account;

class ResetPasswordController extends Controller {
    public function reset(Request $request) {
        $this->validate($request, [
            'email' => 'email|required'
        ]);
        $account = Account::where('email', $request->input('email'))
            ->first();

        if (!$account) {
            return response()->json([], 404);
        }

        $newPassword = str_random(10);
        $account->active = false;
        $account->password = Hash::make($newPassword);
        $account->save();

        $debug = Config::get('app.debug');

        if ($debug) {
            return response()->json([
                'token' => $this->generateToken($account),
                'password' => $newPassword,
            ]);
        } else {
            return response()->json([]);
        }
    }
}
