<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AppointmentRequestController extends Controller
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
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    	use Carbon\Carbon;
	$auth_user = Auth::user();
    
        DB::table('AppointmentRequests')->insertGetId([
		'account_id' => $auth_user->id,
		'appointment_id' => $request->input('appointment_id'),
		'description' => $request->input('description'),
		'subject' => $request->input('subject'),
		'duration_in_min' => $request->input('duration_in_min'),
		'requested_at' => Carbon::now()->toDayDateTimeString(),
		'state' => 'Idle'
		]);
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
	    
	 $requests;
	    
	if($auth_user->type == 'Docent')
	{
		$requests = DB::table('AppointmentRequests')->join('Appointments', 'AppointmentRequests.appointment_id', '=', 'Appointments.id')
			->where('Appointments.account_id', '=', $auth_user->id)
			->get();
	} else
	{
		$requests = DB::table('AppointmentRequests')->where('account_id', '=', $auth_user->id)
			->get();
	}
    
    	return response()->json($requests);
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
    public function update(Request $request)
    {
	$auth_user = Auth::user();
	    
	DB::table('AppointmentRequests')->join('Appointments', 'AppointmentRequests.appointment_id', '=', 'Appointments.id')
		->where('AppiontmentRequest.id', '=', $request->input('id'))
		->where('Appointment.account_id', '=', $auth_user->id)
		->update(['state' => $request->input('state')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $user_id
     * @param  int  $request_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
	$auth_user = Auth::user();
	    
        DB::table('AppointmentRequests')->where('id', '=', $id)
		->where('account_id', '=', $auth_user->id)
		->delete();
    }
}
