<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BannedUsersController extends Controller {
    public function show($id) {
        $banned_users = DB::table("banned_users")
            ->where('account_id', '=', $id)
            ->get();

        return response()->json($banned_users);
    }

    public function store(Request $request, $docent_id) {
        DB::transaction(function() use ($request) {
            DB::table('banned_users')->insert([
                'account_id' => $docent_id,
                'account_banned_id' => $request->input('id')
            ]);
        });
    }

    public function destroy($docent_id, $user_id) {
        DB::transaction(function() use ($request) {
            DB::table('banned_users')
                ->where('account_id', '=', $docent_id)
                ->where('account_banned_id', '=', $user_id)
                ->delete();
        });
    }
}
