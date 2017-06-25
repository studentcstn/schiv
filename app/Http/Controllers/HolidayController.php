<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

use App\Holiday;

class HolidayController extends Controller {
    public function show($from, $to, Request $request) {
        $validator = Validator::make(['from' => $from, 'to' => $to], [
            'from' => 'date_format:Y-m-d',
            'to' => 'date_format:Y-m-d',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 422);
        }

        $holidays = Holiday::where("from", "<", $to)
            ->where("to", ">", $from)
            ->where(function ($query) {
                $query
                    ->where("account_id", null)
                    ->orWhere("account_id", Auth::user()->id);
            })
            ->get();

        return response()->json($holidays);
    }

    public function store(Request $request) {
        $this->validate($request, [
            'from' => 'required|date_format:Y-m-d',
            'to' => 'required|date_format:Y-m-d',
            'name' => 'required|min:2|max:50'
        ]);

        $holiday = Holiday::where('from', $request->input("from"))
            ->where('to', $request->input("to"))
            ->where('name', $request->input("name"))
            ->first();

        if ($holiday) {
            return response()->json(['id' => $holiday->id], 200);
        }

        $holiday = new Holiday;
        $holiday->from = $request->input('from');
        $holiday->to = $request->input('to');
        $holiday->name = $request->input('name');
        $holiday->account_id = Auth::user()->id;
        $holiday->save();

        return response()->json(['id' => $holiday->id]);
    }

    public function update(Request $request) {
        $this->validate($request, [
            'id' => 'required',
            'from' => 'date_format:Y-m-d',
            'to' => 'date_format:Y-m-d',
            'name' => 'min:2|max:50'
        ]);

        $holiday = Holiday::find($request->input("id"));

        if (!$holiday) {
            return response()->json(null, 404);
        }

        $holiday->account_id = Auth::user()->id;
        foreach ($request->only('from', 'to', 'name') as $key => $value) {
            $holiday->$key = $value;
        }
        $holiday->save();

        return response()->json();
    }

    public function destroy($id) {

        $holiday = Holiday::find($id);
        if (!$holiday) {
            return response()->json(null, 404);
        }

        $holiday->delete();

        return response()->json();
    }
}
