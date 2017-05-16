<?php

use Illuminate\Database\Seeder;

class FacultiesTableSeeder extends Seeder
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
        ]);
        DB::table('faculties')->insert([
            'name' => 'Ingenieur'
        ]);
        DB::table('faculties')->insert([
            'name' => 'Wirtschaft'
        ]);
    }
}
