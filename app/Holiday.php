<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Holiday extends Model {
    protected $fillable = ['from', 'to', 'name'];

    public $timestamps = false;

    /**
     * Get begin of next semester.
     *
     * return date as int in seconds since 1970
     *
     * @return int
     */
    public static function getBeginNextSemester() {
        $next = Holiday::where('name', 'Vorlesungsbeginn')
            ->orderBy('from')
            ->where('from', '>=', date('Y-m-d'))
            ->where('ignore', true)
            ->first();

        if (!$next) {
            $currentMonthDay = date('m-d');
            if ($currentMonthDay > "03-15" && $currentMonthDay <= "09-30") {
                return strtotime(date('Y-09-30' ));
            } else if ($currentMonthDay <= "03-15") {
                return strtotime(date('Y-03-15'));
            } else {
                return strtotime(date('Y-03-15', strtotime('next year')));
            }
        } else {
            return strtotime($next->from);
        }
    }
}
