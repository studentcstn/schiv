<?php
namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Account extends Authenticatable {
    use Notifiable;

    protected $hidden = [
        'password', 'remember_token', 'created_at', 'updated_at'
    ];

    public function faculties() {
        return $this->belongsToMany('App\Faculty', 'account_faculties');
    }
    public function appointments() {
        return $this->hasMany('App\Appointment');
    }
    public function bannedUsers() {
        return $this->hasMany('App\AccountBan');
    }
}
