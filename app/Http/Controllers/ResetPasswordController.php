<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Account;

class ResetPasswordController extends Controller {
    public function reset(Request $request) {
        $this->validate($request, [
            'email' => 'email|required',
            'password' => 'required|min:10'
        ]);
        $account = Account::where('email', $request->input('email'))
            ->first();

        if (!$account) {
            return response()->json([], 404);
        }

        $account->active = false;
        $account->password = $request->input('password');
        $account->save();

        return response()->json([
            'token' => $this->generateToken($account)
        ]);
    }
}
