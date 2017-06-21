<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthOnceBasic {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        $header = $request->header();
        if (!isset($header['authorization'][0])) {
            // NOTE Debug
            return response()->json(['reason' => 1], 401);
        }
        $basicAuth = $header['authorization'][0];
        $basicBase64 = explode(" ", $basicAuth);
        if (count($basicBase64) != 2) {
            // NOTE Debug
            return response()->json(['reason' => 2], 401);
        }
        $emailpassword = explode(":", base64_decode($basicBase64[1]));
        if (count($emailpassword) != 2) {
            // NOTE Debug
            return response()->json(['reason' => 3], 401);
        }
        $email = $emailpassword[0];
        $password = $emailpassword[1];
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            return $next($request);
        } else {
            // NOTE Debug
            return response()->json(['reason' => 4], 401);
        }
    }
}
