<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthDocent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $account = Auth::user();
        if ($account->type != 'Docent') {
            return response()->json(['reason' => 5], 401);
        } else {
            return $next($request);
        }
    }
}
