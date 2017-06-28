<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Account;
use App\Faculty;

class SettingController extends Controller {
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

        $this->validate($request, [
            'email' => 'email',
            'password' => 'min:10'
        ]);

        $accountEmail = Account::where('email', $request->input('email'))
                        ->first();

        if ($accountEmail && $account->id !== $accountEmail->id) {
            return response()->json(['message' => 'email already exists'], 401);
        }

        DB::transaction(function() use ($request, $account) {
            if ($request->has('password')) {
                $account->password = Hash::make($request->input('password'));
            }
            if ($request->has('email')) {
                $account->email = $request->input('email');
            }
            $account->save();

            if ($request->has('faculties')) {
                $account->faculties()->detach();

                foreach ($request->input('faculties') as $faculty) {
                    $account->faculties()->save(
                        Faculty::find($faculty)
                    );
                }
            }
        });
    }
}
