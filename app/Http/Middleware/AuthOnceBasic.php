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
        $basicAuth = $header['authorization'][0];
        var_dump($basicAuth);
        $base64 = explode(" ", $basicAuth)[1];
        $emailpassword = explode(":", base64_decode($base64));
        $email = $emailpassword[0];
        $password = $emailpassword[1];

        $email = "helmut.kohl@hof-university.de";
        $password = "clearTextPassword";
        if (Auth::attempt(['email' => $email, 'password' => $password])) {
            return $next($request);
        } else {
            return response()->json([], 401);
        }
    }
}
