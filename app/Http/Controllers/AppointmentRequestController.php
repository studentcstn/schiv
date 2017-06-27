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
            'active' => true,
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
            //todo return email of student
            $requests = DB::table('appointment_requests')
                ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
                ->join('accounts', 'appointment_requests.account_id', 'accounts.id')
                ->select('appointment_requests.id', 'appointment_requests.description', 'subject', 'duration_in_min', 'state', 'appointment_requests.account_id','accounts.email', 'appointment_id', 'appointment_requests.created_at', 'appointment_requests.updated_at')
                ->where('appointments.account_id', '=', $auth_user->id)
                ->where('state', '<>', 'Declined')
                ->where('appointments.active', '=', true)
                ->where('appointment_requests.active', '=', true)
                ->where('appointments.date', '>=', date('Y-m-d'))
                ->get();
        } else {
            $requests = DB::table('appointment_requests')
                ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
                ->select('appointment_requests.id', 'appointment_requests.description', 'subject', 'duration_in_min', 'state', 'appointment_requests.account_id', 'appointment_id', 'appointment_requests.created_at', 'appointment_requests.updated_at')
                ->where('appointment_requests.account_id', '=', $auth_user->id)
                ->where('appointment_requests.state', '=', true)
                ->where('appointments.active', '=', true)
                ->where('appointments.date', '>=', date('Y-m-d'))
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
                ->select('appointment_requests.id', 'appointment_requests.description', 'subject', 'duration_in_min', 'state', 'appointment_requests.account_id', 'appointment_id', 'appointment_requests.created_at', 'appointment_requests.updated_at')
                ->where('appointments.account_id', '=', $auth_user->id)
                ->where('appointments.active', '=', true)
                ->where('appointment_requests.state', '=', true)
                ->where('appointments.date', '<', date('Y-m-d'))
                ->get();
        }else
        {
            $past = DB::table('appointment_requests')
                ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
                ->select('appointment_requests.id', 'appointment_requests.description', 'subject', 'duration_in_min', 'state', 'appointment_requests.account_id', 'appointment_id', 'appointment_requests.created_at', 'appointment_requests.updated_at')
                ->where('appointment_requests.account_id', '=', $auth_user->id)
                ->where('appointments.active', '=', true)
                ->where('appointment_requests.state', '=', true)
                ->where('appointments.date', '<', date('Y-m-d'))
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

            $requests = DB::table('appointment_requests')
                ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
                ->where('appointment_requests.id', '=', $request->input('id'))
                ->where('appointments.account_id', '=', $auth_user->id)
                ->count();

            if($requests)
            {
                DB::table('appointment_requests')
                    ->where('id', '=', $request->input('id'))
                    ->update(['state' => $request->input('state'), 'duration_in_min' => $request->input('duration_in_min')]);

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

        DB::table('appointment_requests')
            ->where('id', '=', $id)
            ->where('account_id', '=', $auth_user->id)
            ->update(['active' => false]);
    }
}
