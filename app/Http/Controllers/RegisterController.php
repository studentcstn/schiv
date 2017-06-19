<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Account;
use App\UserToken;

class RegisterController extends Controller {
    public function store(Request $request) {
        $hash = '';
        DB::transaction(function() use ($request, &$hash) {
            $account = Account::where('email', $request->input('email'))
                ->first();

            if (!$account) {
                $account = new Account();
                $account->email = $request->input('email');
                $account->password = $request->input('password');
                $account->type = "Student";
                $account->active = 0;
                $account->last_login = "0000-00-00 00:00:00";
                $account->save();
            }

            $account_token = new UserToken();
            $account_token->account_id = $account->id;
            $account_token->ttl_in_sec = 123; // TODO rename ttl_in_sec
            $account_token->hash = bin2hex(openssl_random_pseudo_bytes(25));
            $account_token->save();

            $hash = $account_token->hash;
        });

        // TODO send registration email

        // NOTE Debug
        return response()->json(['token' => $hash]);
    }

    public function update(Request $request) {
        DB::transaction(function() use ($request) {
            $token = UserToken::where(
                'hash', $request->input('token')
            )->first();

            if ($token) {
                $account = Account::find($token->account_id);
                if ($account) {
                    $account->active = 1;
                    $account->save();

                    // NOTE Debug
                    echo 'Account activated';
                }
                $token->delete();
            }
        });
    }
}
