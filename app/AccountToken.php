<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AccountToken extends Model {
    public $timestamps = false;

    public function account() {
        return $this->hasOne('App\Account', 'id', 'account_id');
    }
}
