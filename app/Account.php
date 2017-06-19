<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Account extends Model {
    public function faculties() {
        return $this->belongsToMany('App\Faculty', 'account_faculties');
    }
}
