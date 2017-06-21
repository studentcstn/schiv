<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\BannedUser;

class BannedUsersController extends Controller {
    public function show() {
        $docent_account = Auth::user();
        $bannedUsers = BannedUser::where('account_id', $docent_account->id)
            ->get();
        if (!$bannedUsers || $bannedUsers->count() == 0) {
            return response()->json([], 404);
        }
        return response()->json($bannedUsers);
    }

    public function store(Request $request) {
        $docent_account = Auth::user();

        $validator = Validator::make(
            $request->all(),
            ['account_banned_id' => 'required']
        );

        if ($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 500);
        }

        DB::transaction(function() use ($request, $docent_account, &$bannedUser) {
            $bannedUser = new BannedUser;
            $bannedUser->account_id = $docent_account->id;
            $bannedUser->account_banned_id = $request->input('account_banned_id');
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

    public function destroy($user_id) {
        $docent_account = Auth::user();
        $query = BannedUser::where('account_id', $docent_account->id)
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
