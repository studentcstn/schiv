<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Account;
use App\Faculty;

class SettingsController extends Controller {
    public function show() {
        $account = Auth::user();

        $result = [
            'email' => $account->email,
            'account_faculties' => $account->faculties,
            'faculties' => Faculty::all()
        ];

        return response()->json($result);
    }

    public function update(Request $request) {
        $account = Auth::user();

        if (!$account) {
            return response()->json([], 404);
        }

        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:10',
            'faculties' => 'required'
        ]);

        DB::transaction(function() use ($request, $account) {
            $account->password = Hash::make($request->input('password'));
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
