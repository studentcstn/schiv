<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

use App\Account;
use App\AccountToken;
use App\Mail\Registered;

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

        DB::transaction(function() use ($request, &$account, &$token) {
            $generateToken = false;
            if ($account && $account->active == 0) {
                $account->password = Hash::make($request->input('password'));
                $account->save();
                $generateToken = true;
            } else if (!$account) {
                $account = new Account();
                $account->email = $request->input('email');
                $account->password = Hash::make($request->input('password'));
                $account->type = "Student";
                $account->active = 0;
                $account->save();
                $generateToken = true;
            }

            if ($generateToken) {
                $token = $this->generateToken($account);
            }
        });

        Mail::to($account->email)
            ->send(new Registered($token));

        // NOTE Debug
        return response()->json(['token' => $token]);
    }

    public function update(Request $request) {
        AccountToken::where('invalid_at', '<', date('Y-m-d H:i:s'))
            ->delete();

        $token = AccountToken::where(
            'token', $request->input('token')
        )->first();

        if (!$token) {
            return response()->json([], 404);
        }

        $response = null;
        DB::transaction(function() use ($request, $token, &$response) {
            $account = Account::find($token->account_id);
            if ($account && $account->active != 1) {
                $account->active = 1;
                $account->save();
                // NOTE Debug
                $response = response()->json(['message' => 'account activated']);
            }
            $token->delete();
        });

        if ($response) {
            return $response;
        } else {
            return response()->json([]);
        }
    }
}
