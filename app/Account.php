<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model {
    public function faculties() {
        return $this->belongsToMany('App\Faculty', 'account_faculties');
    }
    public function appointments() {
        return $this->hasMany('App\Appointment');
    }
    public function bannedUsers() {
        return $this->hashMany('App\BannedUser');
    }
}
