<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
	$auth_user = Auth::user();
	    
	$is_day = ctype_alpha($request->input('day'));
	    
	if($is_day)
	{
		DB::table('appointments')->insertGetId([
		'account_id' => $auth_user->id,
		'description' => $request->input('description'),
		'active' => true,
		'weekday' => $request->input('day'),
		'time_from' => $request->input('time_from'),
 		'time_to' => $request->input('time_to'),
		]);
	} else
	{
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
    //todo error 500
    public function show()
    {
	$auth_user = Auth::user();
	    
       $appiontments = DB::table('appointments')
            ->where('account_id', '=', $auth_user->id)
	    ->where('active', '=', true)
            ->get();

        return response()->json($appiontments);
    }

    //todo error 500
    public function show_count($count)
    {
	$auth_user = Auth::user();
	    
       $appiontments = DB::table('appointments')
            ->where('account_id', '=', $auth_user->id)
	    ->where('active', '=', false)
	    ->take($count)
            ->get();
	    
	$appointments->toArray();
	$appointment_ids = array();
	    
	foreach($appointments as $value)
	{
		$temp = array($value->id);
		$appointment_ids = array_merge($appointment_ids, $temp); 
		
	}
	    
	$requests = DB::table('appointment_requests')
	    ->whereIn('appointment_id', $appointment_ids)
	    ->get();
	    
	$requests->toArray();
	$appointments = array_merge($appointments, $requests);
	    
        return response()->json($appiontments);
    }

    //todo genaue beschreibung von from und to
    public function show_from_to($from, $to)
    {
	    $appointments = DB::table('appointment_requests')
	 		->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
		    	->where('appointments.active', '=', 'No')
		    	->whereBetween('appointment_requests.requested_at', [$from, $to])
		    	->get();
	    
	    return response()->json($appointments);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $auth_user = Auth::user();
	    
	DB::table('appointments')
		->where('id', '=', $id)
		->where('account_id', '=', $auth_user->id)
		->update(['active' => false]);
    }
}
