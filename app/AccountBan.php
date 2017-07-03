<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class AccountBan extends Model {
    public $timestamps = false;
    public $fillable = ['account_ban_id'];

    public function account() {
        return $this->hasOne('App\Account');
    }
}
