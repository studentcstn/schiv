<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Account;

class DocentController extends Controller {
    public function index() {
        $accounts = Account::where('type', 'Docent')
            ->select('id', 'email')
            ->where('active', true)
            ->get();

        if (!$accounts || $accounts->count() == 0) {
            return response()->json([], 200);
        } else {
            $result = [];
            foreach ($accounts as $account) {
                $result[] = array_merge(
                    $account->toArray(),
                    ['faculties' => $account->faculties]
                );
            }
            return response()->json($result);
        }
    }

    public function show($id) {
        $account = Account::where('type', 'Docent')
            ->where('id', $id)
            ->where('active', true)
            ->select('id', 'email')
            ->first();

        if (!$account) {
            return response()->json([], 404);
        } else {
            $appointments = $account
                ->appointments()
                ->where('active', true)
                ->where('date', '>=', date('Y-m-d'))
                ->get();

            foreach ($appointments as $appointment) {
                $totalInMin = floor(
                    (strtotime($appointment['time_to'], 0) -
                     strtotime($appointment['time_from'], 0)) / 60
                );

                $acceptedInMin = $appointment->sumRequestsDurationTime(
                    true, 'Accepted'
                );
                $idleInMin = $appointment->sumRequestsDurationTime(
                    true, 'Idle'
                );

                $appointment['total_in_min'] = $totalInMin;
                $appointment['accepted_in_min'] = $acceptedInMin;
                $appointment['idle_in_min'] = $idleInMin;
            }

            $result = [
                'id' => $account->id,
                'email' => $account->email,
                'appointments' => $appointments,
                'faculties' => $account->faculties
            ];

            return response()->json($result);
        }
    }
}
