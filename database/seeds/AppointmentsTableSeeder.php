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
            'description' => 'Klausureinsicht',
            'active' => true,
            'date' => '2017-08-17',
            'time_from' => '13:00:00',
            'time_to' => '13:25:00',
        ]);
        DB::table('appointments')->insert([
            'account_id' => 1,
            'description' => 'Einmalige Sprechstunde',
            'active' => true,
            'date' => '2017-07-10',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00',
        ]);
        $parent_id = DB::table('appointments')->insertGetId([
            'account_id' => 2,
            'description' => 'Wiederholende Sprechstunde',
            'active' => true,
            'date' => '2017-08-18',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00',
        ]);
        DB::table('appointments')->insert([
            'account_id' => 2,
            'description' => 'Wiederholende Sprechstunde',
            'active' => true,
            'parent_id' => $parent_id,
            'date' => '2017-07-14',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00',
        ]);
    }
}
