<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class AppointmentRequestController extends Controller {
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request) {
        $auth_user = Auth::user();

        DB::table('appointment_requests')->insertGetId([
            'account_id' => $auth_user->id,
            'appointment_id' => $request->input('appointment_id'),
            'description' => $request->input('description'),
            'subject' => $request->input('subject'),
            'state' => 'Idle'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show() {
        $auth_user = Auth::user();

        if($auth_user->type == 'Docent') {
            $requests = DB::table('appointment_requests')
                ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
                ->where('appointments.account_id', '=', $auth_user->id)
                ->get();
        } else {
            $requests = DB::table('appointment_requests')
                ->where('account_id', '=', $auth_user->id)
                ->get();
        }

        return response()->json($requests);
    }

    public function showPast()
    {
        $auth_user = Auth::user();
        $past;
        
        if($auth_user->type == 'Docent')
        {
            $past = DB::table('appointment_requests')
                ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
                ->select('appointment_requests.id', 'appointment_requests.description', 'subject', 'duration_in_min', 'state', 'appointment_requests.account_id', 'appointment_id')
                ->where('appointments.account_id', '=', $auth_user->id)
                ->where('appointments.active', '=', false)
                ->get();
        }else
        {
            $past = DB::table('appointment_requests')
                ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
                ->select('appointment_requests.id', 'appointment_requests.description', 'subject', 'duration_in_min', 'state', 'appointment_requests.account_id', 'appointment_id')
                ->where('appointment_requests.account_id', '=', $auth_user->id)
                ->where('appointments.active', '=', false)
                ->get();
        }
        
        return response()->json($past);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $auth_user = Auth::user();

        DB::table('appointment_requests')
            ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
            ->where('appointment_requests.id', '=', $request->input('id'))
            ->where('appointment.account_id', '=', $auth_user->id)
            ->update(['state' => $request->input('state')]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $auth_user = Auth::user();

        DB::table('appointment_requests')
            ->where('id', '=', $id)
            ->where('account_id', '=', $auth_user->id)
            ->delete();
    }
}
