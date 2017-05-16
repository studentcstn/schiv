<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->increments('id')->unsigned();
            $table->integer('account_id')->unsigned();
            $table->string('description');
            $table->boolean('active');
            $table->enum('weekdays', ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])->nullable();
            $table->date('date')->nullable();
            $table->time('time_from');
            $table->time('time_to');
            $table->timestamps();

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
        Schema::dropIfExists('appointments');
    }
}
