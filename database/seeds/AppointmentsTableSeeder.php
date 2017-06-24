<?php

use Illuminate\Database\Seeder;

class AppointmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //einmaliger Termin
        DB::table('appointments')->insert([
            'account_id' => 1,
            'description' => 'das ist ein Test-Termin.',
            'active' => true,
            //weekday empty
            'date' => '2017-05-17',
            'time_from' => '13:00:00',
            'time_to' => '13:25:00',
        ]);

        //wiederholender Termin
        DB::table('appointments')->insert([
            'account_id' => 2,
            'description' => 'das ist auch ein Test-Termin.',
            'active' => true,
            'weekday' => 'Sun',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00',
        ]);

        DB::table('appointments')->insert([
            'account_id' => 3,
            'description' => 'Klausureinsicht',
            'active' => true,
            'date' => '2017-05-17',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00',
        ]);
    }
}
