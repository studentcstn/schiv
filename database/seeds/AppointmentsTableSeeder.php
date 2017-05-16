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
        DB::table('appointments')->insert([
            'account_id' => 1,
            'description' => 'das ist ein Test-Termin.',
            'active' => true,
            'weekdays' => 'Wed',
            'date' => '2017-05-17',
            'time_from' => '13:00:00',
            'time_to' => '13:25:00',
        ]);
            
        DB::table('appointments')->insert([
            'account_id' => 2,
            'description' => 'das ist auch ein Test-Termin.',
            'active' => true,
            'weekdays' => 'Sun',
            'date' => '2017-05-17',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00',
        ]);
    }
}
