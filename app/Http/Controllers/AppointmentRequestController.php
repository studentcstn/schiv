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
    //todo can not send duration_in_minute and requested_at
    public function store(Request $request) {
        $auth_user = Auth::user();

        DB::table('appointment_requests')->insertGetId([
            'account_id' => $auth_user->id,
            'appointment_id' => $request->input('appointment_id'),
            'description' => $request->input('description'),
            'subject' => $request->input('subject'),
            'duration_in_min' => $request->input('duration_in_min'),
            'appointment_at' => $request->input('appointment_at'),
            'requested_at' => $request->input('requested_at'),
            'state' => 'idle'
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
                ->where('appointments.account_id', '=', $auth_user->id)
                ->get();
        } else {
            $requests = DB::table('appointment_requests')->where('account_id', '=', $auth_user->id)
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
     * @param  int  $user_id
     * @param  int  $request_id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id) {
        $auth_user = Auth::user();

        DB::table('appointment_requests')->where('id', '=', $id)
            ->where('account_id', '=', $auth_user->id)
            ->delete();
    }
}
