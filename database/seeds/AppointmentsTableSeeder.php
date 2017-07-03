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
            'account_id' => 4,
            'description' => 'das ist ein Test-Termin.',
            'active' => true,
            'date' => '2017-08-17',
            'time_from' => '13:00:00',
            'time_to' => '13:25:00',
        ]);

        DB::table('appointments')->insert([
            'account_id' => 3,
            'description' => 'das ist auch ein Test-Termin.',
            'active' => true,
            'date' => '2017-07-07',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00',
        ]);

        DB::table('appointments')->insert([
            'account_id' => 3,
            'description' => 'Klausureinsicht',
            'active' => true,
            'date' => '2017-08-17',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00',
        ]);

        DB::table('appointments')->insert([
            'account_id' => 3,
            'description' => 'dies ist ein weiderholender Termin',
            'active' => true,
            'parent_id' => 2,
            'date' => '2017-07-14',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00',
        ]);
    }
}
