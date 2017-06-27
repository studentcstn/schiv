<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller {
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $auth_user = Auth::user();

        $is_day = $request->input('weekday');

        if($is_day == 'MON' || $is_day == 'TUE' || $is_day == 'WED' || $is_day == 'THU' || $is_day == 'FRI' || $is_day == 'SAT' || $is_day == 'SUN')
        {
            $start = date('Y-m-d', strtotime("next {$is_day}"));
            $end = DB::table('holidays')
                ->orderBy('from', 'asc')
                ->select('from')
                ->where('name', '=', 'Semesterferien')
                ->take(1)
                ->get();

            $parent_id = 0;

            if($start < $end[0]->from)
            {
                $parent_id = DB::table('appointments')->insertGetId([
                            'account_id' => $auth_user->id,
                            'description' => $request->input('description'),
                            'active' => true,
                            'date' => $start,
                            'time_from' => $request->input('time_from'),
                            'time_to' => $request->input('time_to'),
                        ]);
            }

            $start = strtotime('+1 week', strtotime($start));
            $end = strtotime($end[0]->from);
            $increment = strtotime('+1 week', 0);

            for($i = $start; $i < $end; $i += $increment)
            {
                DB::table('appointments')->insertGetId([
                        'account_id' => $auth_user->id,
                        'description' => $request->input('description'),
                        'active' => true,
                        'parent_id' => $parent_id,
                        'date' => date('Y-m-d', $i),
                        'time_from' => $request->input('time_from'),
                        'time_to' => $request->input('time_to'),
                ]);
            }

        } else if($is_day == 'NULL'){
            if($request->input('date') >= date('Y-m-d'))
            {
                DB::table('appointments')->insertGetId([
                    'account_id' => $auth_user->id,
                    'description' => $request->input('description'),
                    'active' => true,
                    'date' => $request->input('date'),
                    'time_from' => $request->input('time_from'),
                    'time_to' => $request->input('time_to'),
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show() {
        $auth_user = Auth::user();

        $appointments = DB::table('appointments')
            ->where('account_id', '=', $auth_user->id)
            ->where('date', '>=', date('Y-m-d'))
            ->where('active', '=', true)
            ->get();

        return response()->json($appointments);
    }

    public function showPast() {
        $auth_user = Auth::user();

        $past = DB::table('appointments')
            ->where('account_id', '=', $auth_user->id)
            ->where('date', '<', date('Y-m-d'))
            ->where('active', '=', true)
            ->get();

        return response()->json($past);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $auth_user = Auth::user();

        DB::table('appointments')
            ->where('id', '=', $id)
            ->where('account_id', '=', $auth_user->id)
            ->update(['active' => false]);
    }
}
