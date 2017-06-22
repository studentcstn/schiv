<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\Account;
use App\AccountToken;

class Controller extends BaseController {
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function generateToken(Account $account) {
        AccountToken::where('account_id', $account->id)
            ->delete();
        $account_token = new AccountToken();
        $account_token->account_id = $account->id;
        $account_token->invalid_at = date("Y-m-d H:i:s", strtotime("+2 hours"));
        $account_token->hash = bin2hex(openssl_random_pseudo_bytes(25));
        $account_token->save();
        return $account_token->hash;
    }
}
