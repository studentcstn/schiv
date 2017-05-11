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
        DB::table('faculties')->insert([
            'name' => 'Informatik'
        ])
            
        DB::table('faculties')->insert([
            'name' => 'Wirtschaft'
        ])
            
        DB::table('faculties')->insert([
            'name' => 'Inginieurswesen'
        ])
    }
}
