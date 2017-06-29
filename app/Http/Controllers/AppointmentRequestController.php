<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

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

        $this->validate($request, [
            'appointment_id' => 'required|numeric',
            'description' => 'max:255',
            'subject' => 'max:255'
        ]);

	$has_appointment = DB::table('appointment_requests')
		->where('account_id', '=', $auth_user->id)
		->where('appointment_id', '=', $request->input('appointment_id'))
		->where('active', '=', true)
	    	->get();
	    
	if(!$has_appointment->isEmpty())
	{
		return response()->json(null, 429);
	}
	    
        $banner = DB::table('appointments')
            ->select('account_id')
            ->where('id', '=', $request->input('appointment_id'))
	    ->where('active', '=', true)
            ->get();

	$ban;

	if(!$banner->isEmpty())
	{
        	$ban = DB::table('account_bans')
            	->where('account_id', '=', $banner[0]->account_id)
            	->where('account_ban_id', '=', $auth_user->id)
            	->get();
	}

        if($ban->isEmpty())
        {
            DB::table('appointment_requests')->insertGetId([
                'account_id' => $auth_user->id,
                'appointment_id' => $request->input('appointment_id'),
                'description' => $request->input('description'),
                'subject' => $request->input('subject'),
                'active' => true,
                'state' => 'Idle'
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
        $requests;

        if($auth_user->type == 'Docent') {
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
        } else
        {
            $requests = DB::table('appointment_requests')
                ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
                ->select('appointment_requests.id', 'appointment_requests.description', 'subject', 'duration_in_min', 'appointment_requests.at', 'state', 'appointment_requests.account_id', 'appointment_id', 'appointments.date', 'appointment_requests.created_at', 'appointment_requests.updated_at')
                ->where('appointment_requests.account_id', '=', $auth_user->id)
		->where('appointment_requests.active', '=', true)
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
                ->join('accounts', 'appointment_requests.account_id', 'accounts.id')
                ->select('appointment_requests.id', 'appointment_requests.description', 'subject', 'duration_in_min', 'state', 'appointment_requests.account_id','accounts.email', 'appointment_id', 'appointment_requests.created_at', 'appointment_requests.updated_at')
                ->where('appointments.account_id', '=', $auth_user->id)
                ->where('appointments.active', '=', true)
                ->where('appointment_requests.state', '=', true)
                ->where('appointments.date', '<', date('Y-m-d'))
                ->get();
        }else
        {
            $past = DB::table('appointment_requests')
                ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
                ->select('appointment_requests.id', 'appointment_requests.description', 'subject', 'duration_in_min', 'appointment_requests.at', 'state', 'appointment_requests.account_id', 'appointment_id', 'appointments.date', 'appointment_requests.created_at', 'appointment_requests.updated_at')
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

        $this->validate($request, [
            'id' => 'required|numeric',
            'state' => Rule::in(['Accepted', 'Declined']),
            'duration_in_min' => 'required|numeric'
        ]);

        $requests = DB::table('appointment_requests')
            ->join('appointments', 'appointment_requests.appointment_id', '=', 'appointments.id')
            ->where('appointment_requests.id', '=', $request->input('id'))
            ->where('appointments.account_id', '=', $auth_user->id)
            ->count();

        if($requests)
        {	
		if(!$request->input('state') == 'Declined')
		{
			$already = DB::table('appointment_requests')
				->where('id', '=', $request->input('id'))
				->where('duration_in_min', '=', null)
				->count();

			$appointment_id = DB::table('appointment_requests')
				    ->select('appointment_id')
				    ->where('id', '=', $request->input('id'))
				    ->get();


			if($already)
			{
			    $latest = DB::table('appointment_requests')
				    ->select('at')
				    ->where('appointment_id', '=', $appointment_id[0]->appointment_id)
				    ->orderBy('at', 'desc')
				    ->take(1)
				    ->get();

			    if($latest[0]->at == null)
			    {
				$latest = DB::table('appointments')
				    ->select('time_from as at')
				    ->where('id', '=', $appointment_id[0]->appointment_id)
				    ->get();
			    }

			    $at = date('H:i:s', strtotime("+{$request->input('duration_in_min')} minutes", strtotime($latest[0]->at)));
echo $at.';'.$request->input('duration_in_min');
			    DB::table('appointment_requests')
				->where('id', '=', $request->input('id'))
				->update(['state' => $request->input('state'), 'duration_in_min' => $request->input('duration_in_min'), 'at' => $at]);
			}else
			{
			    $current = DB::table('appointment_requests')
				->select('at', 'duration_in_min')
				->where('id', '=', $request->input('id'))
				->get();

			    $tocorrect = DB::table('appointment_requests')
				->select('id', 'at')
				->where('appointment_id', '=', $appointment_id[0]->appointment_id)
				->where('at', '>', $current[0]->at)
				->get();

			    $difference = $request->input('duration_in_min') - $current[0]->duration_in_min;

			    DB::table('appointment_requests')
				->where('id', '=', $request->input('id'))
				->update(['state' => $request->input('state'), 'duration_in_min' => $request->input('duration_in_min'), 'at' => date('H:i:s', strtotime("+{$difference} minutes", strtotime($current[0]->at)))]);

			    for($i = 0; $i < count($tocorrect); ++$i)
			    {
				DB::table('appointment_requests')
				    ->where('id', '=', $tocorrect[$i]->id)
				    ->update(['at' => date('H:i:s', strtotime("+{$difference} minutes", strtotime($tocorrect[$i]->at)))]);
			    }
			}
		}else
		{
			echo "DAS KANN NICHT SEIN!!!!";
			DB::table('appointment_requests')
				->where('id', '=', $request->input('id'))
				->update(['state' => $request->input('state'), 'duration_in_min' => null, 'at' => null]);
		}
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

        $fourOFour = DB::table('appointment_requests')
            ->where('id', '=', $id)
            ->where('account_id', '=', $auth_user->id)
	    ->where('active', '=', true)
            ->update(['active' => false]);

        if($fourOFour == 0)
        {
            return response()->json(null, 404);
        }else
	{
	    $already = DB::table('appointment_requests')
		->where('id', '=', $id)
		->where('duration_in_min', '=', null)
		->count();

	    if(!$already)
	    {
	        $appointment_id = DB::table('appointment_requests')
		    ->select('appointment_id')
		    ->where('id', '=', $id)
		    ->get();

		$current = DB::table('appointment_requests')
		   ->select('at', 'duration_in_min')
		    ->where('id', '=', $id)
		    ->get();

		$tocorrect = DB::table('appointment_requests')
		    ->select('id', 'at')
		    ->where('appointment_id', '=', $appointment_id[0]->appointment_id)
		    ->where('at', '>', $current[0]->at)
		    ->get();

		$difference = 0 - $current[0]->duration_in_min;

		DB::table('appointment_requests')
		    ->where('id', '=', $id)
		    ->update(['duration_in_min' => null, 'at' => null]);

		for($i = 0; $i < count($tocorrect); ++$i)
		{
			DB::table('appointment_requests')
			    ->where('id', '=', $tocorrect[$i]->id)
			    ->update(['at' => date('H:i:s', strtotime("+{$difference} minutes", strtotime($tocorrect[$i]->at)))]);
		}
	    }
	}
    }
}
