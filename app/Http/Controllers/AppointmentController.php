<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller {
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $auth_user = Auth::user();

        $this->validate($request, [
            'weekday'=> Rule::in(['MON','TUE','WED','THU','FRI','SAT','SUN','NULL']),
            'date'=> 'required_if:weekday,==,NULL|date_format:Y-m-d',
	    'description' => 'required|max:255',
            'time_from'=> 'date_format:H:i:s',
            'time_to'=> 'date_format:H:i:s'
        ]);

        $is_day = $request->input('weekday');

        if($is_day == 'MON' || $is_day == 'TUE' || $is_day == 'WED' || $is_day == 'THU' || $is_day == 'FRI' || $is_day == 'SAT' || $is_day == 'SUN')
        {
            $start = date('Y-m-d', strtotime("next {$is_day}"));
            $end = DB::table('holidays')
                ->orderBy('from', 'asc')
                ->select('from')
                ->where('name', '=', 'Vorlesungsende')
                ->take(1)
                ->get();

            $holidays = DB::table('holidays')
                ->select('from', 'to')
                ->where('account_id', '=', 'NULL')
                ->orWhere('account_id', '=', $auth_user->id)
                ->where('from', '<', $end[0]->from)
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

                DB::table('appointments')
                    ->where('id', '=', $parent_id)
                    ->update(['parent_id' => $parent_id]);
            }

            $start = strtotime('+1 week', strtotime($start));
            $end = strtotime($end[0]->from);
            $increment = strtotime('+1 week', 0);

            for($i = $start; $i < $end; $i += $increment)
            {
                $is_holiday = false;

                for($ii = 0; $ii < count($holidays); ++$ii)
                {
                    $current_date = date('Y-m-d', $i);
                    if($current_date >= $holidays[$ii]->from && $current_date <= $holidays[$ii]->to)
                    {
                        $is_holiday = true;
                        break 1;
                    }
                }

                if(!$is_holiday)
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
            }

        } else if($is_day == 'NULL'){

            if($request->input('date') >= date('Y-m-d'))
            {
                $parent_id = DB::table('appointments')->insertGetId([
                        'account_id' => $auth_user->id,
                        'description' => $request->input('description'),
                        'active' => true,
                        'date' => $request->input('date'),
                        'time_from' => $request->input('time_from'),
                        'time_to' => $request->input('time_to'),
                    ]);

                DB::table('appointments')
                    ->where('id', '=', $parent_id)
                    ->update(['parent_id' => $parent_id]);
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

        if(!$appointments->isEmpty())
        {
            return response()->json($appointments);
        }else
        {
            return response()->json(null, 404);
        }
    }

    public function showPast() {
        $auth_user = Auth::user();

        $past = DB::table('appointments')
            ->where('account_id', '=', $auth_user->id)
            ->where('date', '<', date('Y-m-d'))
            ->where('active', '=', true)
            ->get();

        if(!$past->isEmpty())
        {
            return response()->json($past);
        }else
        {
            return response()->json(null, 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $auth_user = Auth::user();

        $fourOFour = DB::table('appointments')
            ->where('id', '=', $id)
            ->where('account_id', '=', $auth_user->id)
	    ->where('active', '=', true)
            ->update(['active' => false]);

        if($fourOFour == 0)
        {
            return response()->json(null, 404);
        }
    }
}
