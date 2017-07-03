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
            ->where("ignore", false)
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

        if ($request->input('from') > $request->input('to')) {
            return response()->json(['from' => 'is greater than to'], 422);
        }

        $holiday = Holiday::where('from', $request->input("from"))
            ->where('to', $request->input("to"))
            ->where("ignore", false)
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
        $holiday->ignore = false;
        $holiday->save();

        return response()->json($holiday);
    }

    public function update(Request $request) {
        $this->validate($request, [
            'id' => 'required',
            'from' => 'date_format:Y-m-d',
            'to' => 'date_format:Y-m-d',
            'name' => 'min:2|max:50'
        ]);

        $holiday = Holiday::find($request->input("id"));

        if (!$holiday || $holiday->ignore || $holiday->account_id != Auth::user()->id) {
            return response()->json(null, 404);
        }

        $all = ['from', 'to', 'name'];

        $holiday->account_id = Auth::user()->id;
        foreach ($all as $key) {
            if ($request->has($key)) {
                $holiday->$key = $request->input($key);
            }
        }
        $holiday->save();
        return response()->json();
    }

    public function destroy($id) {
        $holiday = Holiday::find($id);
        if (!$holiday || $holiday->ignore || $holiday->account_id != Auth::user()->id) {
            return response()->json(null, 404);
        }

        $holiday->delete();

        return response()->json();
    }
}
