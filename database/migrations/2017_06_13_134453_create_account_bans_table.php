<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountBansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('account_bans', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('account_id')->unsigned();
            $table->integer('account_ban_id')->unsigned();
            $table->datetime('ban_until');
        });

        Schema::table('account_bans', function (Blueprint $table) {
            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade');
            $table->foreign('account_ban_id')->references('id')->on('accounts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::table('account_bans', function (Blueprint $table) {
            $table->dropForeign('account_bans_account_id_foreign');
            $table->dropForeign('account_bans_account_ban_id_foreign');
        });
        Schema::dropIfExists('account_bans');
    }
}
