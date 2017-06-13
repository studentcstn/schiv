<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SettingsController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $account = DB::table("accounts")
            ->select('email')
            ->where('accounts.id', '=', $id)
            ->get();

        $account_faculties = DB::table("accounts")
            ->join('account_faculties', 'accounts.id', '=', 'account_faculties.account_id')
            ->join('faculties', 'account_faculties.faculty_id', '=', 'faculties.id')
            ->select('faculties.id', 'faculties.name')
            ->where('accounts.id', '=', $id)
            ->get();

        $faculties = DB::table("faculties")
            ->select('id', 'name')
            ->get();

        $result = (array)$account[0];
        $result['account_faculties'] = $account_faculties;
        $result['faculties'] = $faculties;

        return response()->json($result);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        DB::transaction(function() use ($request, $id) {
            DB::table('accounts')->update([
                'password' => $request->input('password'),
                'email' => $request->input('email')
            ]);

            DB::table('account_faculties')
                ->where('account_id', '=', $id)
                ->delete();

            foreach ($request->input('faculties') as $faculty) {
                DB::table('account_faculties')->insert([
                    'account_id' => $id,
                    'faculty_id' => $faculty['id'],
                ]);
            }
        });
    }
}
