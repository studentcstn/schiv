<?php

use Illuminate\Database\Seeder;

class AccountsFacultiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('account_faculties')->insert([
            'faculty_id' => '1',
            'account_id' => '2',
        ]);
        DB::table('account_faculties')->insert([
            'faculty_id' => '2',
            'account_id' => '3',
        ]);
        DB::table('account_faculties')->insert([
            'faculty_id' => '3',
            'account_id' => '1',
        ]);
    }
}
