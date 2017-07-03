<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

use App\Account;
use App\Holiday;
use App\AccountBan;
use App\AppointmentRequest;

class AccountBanController extends Controller {
    public function show() {
        $accountDocent = Auth::user();
        $accountBans = AccountBan::where('account_id', $accountDocent->id)
            ->get();
        if (!$accountBans || $accountBans->count() == 0) {
            return response()->json([], 200);
        }

        $result = [];
        foreach ($accountBans as $accountBan) {
            $row = $accountBan->toArray();
            $row['email'] = Account::find($row['account_ban_id'])->email;
            $result[] = $row;
        }

        return response()->json($result);
    }

    public function store(Request $request) {
        $accountDocent = Auth::user();

        $this->validate($request, ['account_ban_id' => 'required']);

        $accountToBan = Account::find(
            $request->input('account_ban_id')
        );

        if (!$accountToBan) {
            return response()->json([], 404);
        }

        DB::transaction(function() use ($accountToBan, $accountDocent, &$accountBan) {
            AppointmentRequest::where('account_id', $accountToBan->id)
                ->update(['state' => 'Declined']);

            $accountBan = AccountBan::firstOrNew([
                'account_id' => $accountDocent->id,
                'account_ban_id' => $accountToBan->id
            ]);
            $accountBan->account_id = $accountDocent->id;
            $accountBan->account_ban_id = $accountToBan->id;
            $accountBan->ban_until = date('Y-m-d 00:00:00', Holiday::getBeginNextSemester());
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
