<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\BannedUser;

class BannedUsersController extends Controller {
    public function show($docent_id) {
        return response()->json(
            BannedUser::where('account_id', $docent_id)
                ->get()
        );
    }

    public function store(Request $request, $docent_id) {
        DB::transaction(function() use ($request, $docent_id, &$bannedUser) {
            $bannedUser = new BannedUser;
            $bannedUser->account_id = $docent_id;
            $bannedUser->account_banned_id = $request->input('user_id');
            $bannedUser->banned_until = date('Y-m-d h:i:s', strtotime("now + 3 months"));
            $bannedUser->save();
        });

        //NOTE debug
        return response()->json($bannedUser);
    }

    public function destroy($docent_id, $user_id) {
        DB::transaction(function() use ($docent_id, $user_id) {
            $bannedUser = BannedUser::where('account_id', $docent_id)
                ->where('account_banned_id', $user_id)
                ->delete();
        });
    }
}
