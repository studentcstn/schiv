<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHolidaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('holidays', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('account_id')->unsigned()->nullable();
            $table->boolean('ignore');
            $table->string('name');
            $table->date('from');
            $table->date('to');

            $table->unique(['from', 'to', 'name']);
        });

        Schema::table('holidays', function (Blueprint $table) {
            $table->foreign('account_id')->references('id')->on('accounts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('holidays');
    }
}
