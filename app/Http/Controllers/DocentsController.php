<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DocentsController extends Controller {
    public function index() {
        $docents = DB::table("accounts")
            ->select('id', 'email')
            ->get();

        return response()->json($docents);
    }

    public function show($id) {
        $docents = DB::table("accounts")
            ->select('id', 'email')
            ->where('id', '=', $id)
            ->where('type', '=', 'Dozent')
            ->get();

        if ($docents->count() == 0) {
            abort(404);
        }

        return response()->json($docents[0]);
    }
}
