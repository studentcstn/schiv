<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

use App\Account;

class AuthEnforce {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $id = $request->session()->get('login_account_id');

        if ($id) {
            $account = Account::find($id);
            if ($account && $account->active) {
                Auth::login($account);
                return $next($request);
            }
        }

        return response()->json(['message' => 'login required'], 401);
    }
}
