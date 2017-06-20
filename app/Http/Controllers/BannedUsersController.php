<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\BannedUser;

class BannedUsersController extends Controller {
    public function show($docent_id) {
        $bannedUsers = BannedUser::where('account_id', $docent_id)
            ->get();
        if (!$bannedUsers || $bannedUsers->count() == 0) {
            return response()->json([], 404);
        }
        return response()->json($bannedUsers);
    }

    public function store(Request $request, $docent_id) {
        DB::transaction(function() use ($request, $docent_id, &$bannedUser) {
            $bannedUser = new BannedUser;
            $bannedUser->account_id = $docent_id;
            $bannedUser->account_banned_id = $request->input('user_id');
            $bannedUser->banned_until; {
                $currentMonth = date('m');
                if ($currentMonth >= 3 && $currentMonth <= 9) {
                    $bannedUser->banned_until = date(
                        'Y-09-15 h:i:s'
                    );
                } else {
                    $bannedUser->banned_until = date(
                        'Y-02-28 h:i:s',
                        strtotime('next year')
                    );
                }
            }
            $bannedUser->save();
        });

        return response()->json($bannedUser);
    }

    public function destroy($docent_id, $user_id) {
        $query = BannedUser::where('account_id', $docent_id)
            ->where('account_banned_id', $user_id);

        $count = $query->count();

        if ($count == 0) {
            return response()->json([], 404);
        }

        DB::transaction(function() use ($query) {
            $query->delete();
        });
    }
}
