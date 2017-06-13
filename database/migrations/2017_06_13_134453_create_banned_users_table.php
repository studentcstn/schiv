<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBannedUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('banned_users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('account_id')->unsigend();
            $table->integer('account_banned_id')->unsigend();
            $table->datetime('banned_until')->unsigend();

            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade');
            $table->foreign('account_banned_id')->references('id')->on('accounts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('banned_users', function (Blueprint $table) {
            $table->dropForeign('banned_users_account_id_foreign');
            $table->dropForeign('banned_users_account_banned_id_foreign');
        });
        Schema::dropIfExists('banned_users');
    }
}
