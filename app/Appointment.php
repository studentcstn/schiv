<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model {
    public function appointmentRequests() {
        return $this->hasMany('App\AppointmentRequest');
    }

    public function sumRequestsDurationTime($active, $state) {
        return $this->appointmentRequests()
            ->where('active', true)
            ->where('state', $state)
            ->sum('duration_in_min');
    }
}
