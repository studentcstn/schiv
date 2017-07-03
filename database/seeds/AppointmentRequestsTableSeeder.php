<?php

use Illuminate\Database\Seeder;

class AppointmentRequestsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('appointment_requests')->insert([
            'description' => '...',
            'subject' => 'Klausureinsicht',
            'duration_in_min' => 30,
            'active' => true,
            'state' => 'Accepted',
            'account_id'=> 3,
            'appointment_id' => 1,
        ]);
        DB::table('appointment_requests')->insert([
            'description' => '...',
            'subject' => 'Studienarbeit',
            'duration_in_min' => 30,
            'active' => true,
            'state' => 'Idle',
            'account_id'=> 3,
            'appointment_id' => 2,
        ]);
        DB::table('appointment_requests')->insert([
            'description' => '...',
            'subject' => 'Bachelorarbeit',
            'active' => true,
            'state' => 'Idle',
            'account_id'=> 4,
            'appointment_id' => 3,
        ]);
    }
}
