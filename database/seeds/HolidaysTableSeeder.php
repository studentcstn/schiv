<?php

use Illuminate\Database\Seeder;

class HolidaysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('holidays')->insert([
            'from' => '2017-05-08 00:00:00',
            'to' => '2017-10-01 00:00:00'
        ]);
        DB::table('holidays')->insert([
            'from' => '2018-05-08 00:00:00',
            'to' => '2018-10-01 00:00:00'
        ]);
    }
}
