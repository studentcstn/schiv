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
            $bannedUser->bannedUntil; {
                $currentMonth = date('m');
                if ($currentMonth >= 3 && $currentMonth <= 9) {
                    $bannedUser->bannedUntil = date(
                        'Y-09-15 h:i:s'
                    );
                } else {
                    $bannedUser->bannedUntil = date(
                        'Y-02-28 h:i:s',
                        strtotime('next year')
                    );
                }
            }
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
