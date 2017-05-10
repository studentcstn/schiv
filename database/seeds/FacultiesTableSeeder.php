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
        table('facutlies')->insert([
            'name' => 'Informatik'
        ])->insert([
            'name' => 'Ingenieur'
        ])->insert([
            'name' => 'Wirtschaft'
        ]);
    }
}
