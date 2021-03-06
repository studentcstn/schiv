<?php

use Illuminate\Database\Seeder;

class AppointmentRequestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('appointment_requests')->insert([
            'description' => 'dies ist eine Testanfrage',
            'subject' => 'über das möchte ich reden',
            'duration_in_min' => 30,
            'active' => true,
            'state' => 'Idle',
            'account_id'=> 2,
            'appointment_id' => 1,

        ]);

       DB::table('appointment_requests')->insert([
            'description' => 'dies ist auch eine Testanfrage',
            'subject' => 'über das möchte ich nicht reden',
            'duration_in_min' => 30,
            'active' => true,
            'state' => 'Idle',
            'account_id'=> 2,
            'appointment_id' => 2,

       ]);

        DB::table('appointment_requests')->insert([
            'description' => 'dies ist auch eine Testanfrage',
            'subject' => 'über das möchte ich nicht reden',
            'active' => true,
            'state' => 'Idle',
            'account_id'=> 1,
            'appointment_id' => 3,
        ]);
    }
}
