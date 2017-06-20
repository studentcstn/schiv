<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use App\Account;
use App\Faculty;

class SettingsController extends Controller {
    public function show($id) {
        $account = Account::find($id);

        if (!$account) {
            return response()->json([], 404);
        }

        $result = [
            'email' => $account->email,
            'account_faculties' => $account->faculties,
            'faculties' => Faculty::all()
        ];

        return response()->json($result);
    }

    public function update(Request $request, $id) {
        $account = Account::find($id);

        if (!$account) {
            return response()->json([], 404);
        }

        $validator = Validator::make(
            $request->all(), [
                'email' => 'required|email',
                'password' => 'required|min:10',
                'faculties' => 'required'
            ]
        );

        if ($validator->fails()) {
            return response()->json(['messages' => $validator->messages()], 500);
        }

        DB::transaction(function() use ($request, $account) {
            // TODO password hash (client or server?)
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
