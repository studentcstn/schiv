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

        $is_day = $request->input('day');
        $muster = '^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$';

        if(($is_day == 'MON') || $is_day == 'TUE') || $is_day == 'WED') || $is_day == 'THU') || $is_day == 'FRI') || $is_day == 'SAT') || $is_day == 'SUN')) {
            DB::table('appointments')->insertGetId([
                'account_id' => $auth_user->id,
                'description' => $request->input('description'),
                'active' => true,
                'weekday' => $request->input('day'),
                'time_from' => $request->input('time_from'),
                'time_to' => $request->input('time_to'),
            ]);
        } else if(preg_match($muster, $is_day)){
            DB::table('appointments')->insertGetId([
                'account_id' => $auth_user->id,
                'description' => $request->input('description'),
                'active' => true,
                'date' => $request->input('day'),
                'time_from' => $request->input('time_from'),
                'time_to' => $request->input('time_to'),
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show() {
        $auth_user = Auth::user();

        $appointments = DB::table('appointments')
            ->where('account_id', '=', $auth_user->id)
            ->where('active', '=', true)
            ->get();

        return response()->json($appointments);
    }

    public function showCount($count) {
        $auth_user = Auth::user();

        $appointments = DB::table('appointments')
            ->where('account_id', '=', $auth_user->id)
            ->where('active', '=', false)
            ->take($count)
            ->get();

        $appointment_ids = [];
        foreach($appointments->toArray() as $value) {
            $appointment_ids[] = $value->id;
        }

        $requests = DB::table('appointment_requests')
            ->whereIn('appointment_id', $appointment_ids)
            ->get();

        $appointments = array_merge(
            $appointments->toArray(),
            $requests->toArray()
        );

        return response()->json($appointments);
    }

    /**
     * @param string $from date with format 'YYYY-MM-DD HH:MM:SS'
     * @param string $to date with format 'YYYY-MM-DD HH:MM:SS'
     * @return \Illuminate\Http\Response
     */
    public function showFromTo($from, $to) {
        $appointments = DB::table('appointment_requests')
            ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
            ->where('appointments.active', '=', false)
            ->whereBetween('appointment_requests.appointment_at', [$from, $to])
            ->get();

        return response()->json($appointments);
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
