<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Account;
use App\AccountFaculty;
use App\Faculty;

class SettingsController extends Controller {
    public function show($id) {
        $account = Account::find($id);

        $result = [
            'email' => $account->email,
            'account_faculties' => $account->faculties,
            'faculties' => Faculty::all()
        ];

        return response()->json($result);
    }

    public function update(Request $request, $id) {
        DB::transaction(function() use ($request, $id) {
            $account = Account::find($id);
            $account->password = $request->input('password');
            $account->email = $request->input('email');
            $account->save();

            $account->faculties()->detach();

            foreach ($request->input('faculties') as $faculty) {
                $account->faculties()->save(
                    Faculty::find($faculty['id'])
                );
            }
        });
    }
}
