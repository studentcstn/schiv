<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccountFacultiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::enableForeignKeyConstraints();

        Schema::create('account_faculties', function (Blueprint $table) {
            $table->increments('id')->unsigend();
            $table->integer('account_id')->unsigned();
            $table->integer('faculty_id')->unsigned();

            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade');
            $table->foreign('faculty_id')->references('id')->on('faculties')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('account_faculties', function (Blueprint $table) {
            $table->dropForeign('account_faculties_account_id_foreign');
            $table->dropForeign('account_faculties_faculty_id_foreign');
        });
        Schema::dropIfExists('account_faculties');
    }
}
