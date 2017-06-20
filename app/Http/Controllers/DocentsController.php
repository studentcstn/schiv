<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Account;

class DocentsController extends Controller {
    public function index() {
        $accounts = Account::where('type', 'Docent')
            ->select('id', 'email')
            ->get();

        if (!$accounts || $accounts->count() == 0) {
            return response()->json([], 404);
        } else {
            return response()->json($accounts);
        }
    }

    public function show($id) {
        $account = Account::where('type', 'Docent')
            ->where('id', $id)
            ->select('id', 'email')
            ->first();

        if (!$account) {
            return response()->json([], 404);
        } else {
            $result = [
                'id' => $account->id,
                'email' => $account->email,
                'appointments' => $account->appointments()->get()
            ];

            return response()->json($result);
        }
    }
}
