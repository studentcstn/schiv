<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Account;
use App\AccountBan;

class AccountBanController extends Controller {
    //todo return name of baned user
    //todo return [] 200 instead of [] 404
    public function show() {
        $accountDocent = Auth::user();
        $accountBan = AccountBan::where('account_id', $accountDocent->id)
            ->get();
        if (!$accountBan || $accountBan->count() == 0) {
            return response()->json([], 404);
        }
        return response()->json($accountBan);
    }

    public function store(Request $request) {
        $accountDocent = Auth::user();

        $this->validate($request, ['account_ban_id' => 'required']);

        $accountToBan = Account::find($request->input('account_ban_id'));

        if (!$accountToBan) {
            return response()->json([], 404);
        }

        DB::transaction(function() use ($accountToBan, $accountDocent, &$accountBan) {
            $accountBan = new AccountBan;
            $accountBan->account_id = $accountDocent->id;
            $accountBan->account_ban_id = $accountToBan->id;
            $accountBan->ban_until; {
                $currentMonth = date('m');
                if ($currentMonth >= 3 && $currentMonth <= 9) {
                    $accountBan->ban_until = date(
                        'Y-09-15 h:i:s'
                    );
                } else {
                    $accountBan->ban_until = date(
                        'Y-02-28 h:i:s',
                        strtotime('next year')
                    );
                }
            }
            $accountBan->save();
        });

        return response()->json($accountBan);
    }

    public function destroy($user_id) {
        $accountDocent = Auth::user();
        $query = AccountBan::where('account_id', $accountDocent->id)
            ->where('account_ban_id', $user_id);

        $count = $query->count();

        if ($count == 0) {
            return response()->json([], 404);
        }

        DB::transaction(function() use ($query) {
            $query->delete();
        });
    }
}
