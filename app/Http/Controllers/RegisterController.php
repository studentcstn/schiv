<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Account;
use App\UserToken;

class RegisterController extends Controller {
    public function store(Request $request) {
        if (!$request->has('email') || !$request->has('password')) {
            return response()->json(['messages' => ["email or password missing"]], 500);
        }

        $validator = Validator::make(
            $request->all(), [
                'email' => 'required|email',
                'password' => 'required|min:10'
            ]
        );

        if ($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 500);
        }

        $account = Account::where('email', $request->input('email'))
            ->first();

        if ($account && $account->active == 1) {
            return response()->json(['messages' => [['account already registered']]], 500);
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
                $account_token = new UserToken();
                $account_token->account_id = $account->id;
                $account_token->invalid_at = date("Y-m-d H:i:s", strtotime("+2 hours"));
                $account_token->hash = bin2hex(openssl_random_pseudo_bytes(25));
                $account_token->save();

                $hash = $account_token->hash;
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
                echo 'Account activated';
            }
            $token->delete();
        });
    }
}
