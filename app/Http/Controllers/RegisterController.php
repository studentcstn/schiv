<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Account;
use App\UserToken;

class RegisterController extends Controller {
    public function store(Request $request) {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:10'
        ]);

        $account = Account::where('email', $request->input('email'))
            ->first();

        if ($account && $account->active == 1) {
            return response()->json(['message' => 'account already registered'], 409);
        }

        DB::transaction(function() use ($request, $account, &$hash) {
            $generateToken = true;
            if ($account && $account->active == 0) {
                $account->password = $request->input('password');
                $generateToken = true;
            } else if (!$account) {
                $account = new Account();
                $account->email = $request->input('email');
                $account->password = $request->input('password');
                $account->type = "Student";
                $account->active = 0;
                $account->last_login = "0000-00-00 00:00:00";
                $account->save();
                $generateToken = true;
            }

            if ($generateToken) {
                $hash = $this->generateToken($account);
            }
        });

        // NOTE Debug
        return response()->json(['token' => $hash]);
    }

    public function update(Request $request) {
        UserToken::where('invalid_at', '<', date('Y-m-d H:i:s'))
            ->delete();

        $token = UserToken::where(
            'hash', $request->input('token')
        )->first();

        if (!$token) {
            return response()->json([], 500);
        }

        DB::transaction(function() use ($request, $token) {
            $account = Account::find($token->account_id);
            if ($account && $account->active != 1) {
                $account->active = 1;
                $account->save();
                // NOTE Debug
                return response()->json(['message' => 'account activated']);
            }
            $token->delete();
        });
    }
}
