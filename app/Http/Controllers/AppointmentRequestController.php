<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
    public function store(Request $request, $id)
    {
    	use Carbon\Carbon;
    
        DB::table('AppointmentRequests')->insertGetId([
		'account_id' => $id,
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
    public function show($id)
    {
        //
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    	 $is_docent = DB::table('Accounts')->where('id', '=', $id)
       		->select('type')
		->get();
		
	 $requests;
	if($is_docent == 'Docent')
	{
		$requests = DB::table('AppointmentRequests')->join('Appointments', 'AppointmentRequests.appointment_id', '=', 'Appointments.id')
			->where('Appointments.account_id', '=', $id)
			->get();
	} else
	{
		$requests = DB::table('AppointmentRequests')->where('account_id', '=', $id)
			->get();
	}
    
    	return response()->json($requests);
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
       $is_docent = DB::table('Accounts')->where('id', '=', $id)
       		->select('type')
		->get();
		
	if($is_docent == 'Docent')
	{
		DB::table('AppointmentRequests')->where('id', '=', $request->input('id'))
			->update(['state' => $request->input('state')]);
	}
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $user_id
     * @param  int  $request_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($user_id, $request_id)
    {
        DB::table('AppointmentRequests')->where('id', '=', $request_id)
		->where('account_id', '=', $user_id)
		->delete();
    }
}
