<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller {
    private function is_schaltjahr($date)
    {
        $year = substr($date, 0, 4);
        
        if($year % 100 == 0)
        {
            if(($year % 400 == 0))
            {
                return true;
            }else
            {
                return false;
            }
        }else if($year % 4 == 0)
        {
            return true;
        }else
        {
            return false;
        }
    }
    
    private function valid_date($date)
    {
        if(substr($date, 5, 2) == '02')
        {
            if(is_schaltjahr($date))
            {
                if(substr($date, 8, 2) <= 29)
                {
                    return true;
                }else
                {
                    return false;
                }
            }else
            {
                if(substr($date, 8, 2) <= 28)
                {
                    return true;
                }else
                {
                    return false;
                }
            }
        }else
        {
            return true;
        }
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $auth_user = Auth::user();

        $is_day = $request->input('weekday');
        $muster = '^\d\d\d\d[-](((0[13578]|1[02])[-](0[1-9]|[12][0-9]|3[01]))|((0[2469]|1[1])[-](0[1-9]|[12][0-9]|3[0])))$';
        
        if(($is_day == 'MON' || $is_day == 'TUE' || $is_day == 'WED' || $is_day == 'THU' || $is_day == 'FRI' || $is_day == 'SAT' || $is_day == 'SUN') && ($request->input('date') == 'NULL'))
        {
            //TODO alle termine bis zum ende des semesters
        } else if(preg_match($muster, $is_day) && ($request->input('weekday') == 'NULL') && valid_date($request->input('date'))){
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

    /**
     * Display the specified resource.
     *
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

    public function showPast() {
        $auth_user = Auth::user();
        
        $past = DB::table('appointments')
            ->where('account_id', '=', $auth_user->id)
            ->where('active', '=', false)
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
