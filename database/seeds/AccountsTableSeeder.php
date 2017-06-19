<?php

use Illuminate\Database\Seeder;

class AccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //factory(App\Account::class, 10)->create();
        DB::table('accounts')->insert([
            'email' => 'max.musterman@hof-university.de',
            'password' => 'clearTextPassword',
            'type' => 'Student',
            'active' => true,
            'last_login' => '2017-05-09 12:35:59'
        ]);
        DB::table('accounts')->insert([
            'email' => 'hanz.wurst@hof-university.de',
            'password' => 'clearTextPassword',
            'type' => 'Student',
            'active' => true,
            'last_login' => '2017-03-15 03:59:02'
        ]);
        DB::table('accounts')->insert([
            'email' => 'helmut.kohl@hof-university.de',
            'password' => 'clearTextPassword',
            'type' => 'Docent',
            'active' => true,
            'last_login' => '2017-05-10 13:47:05'
        ]);
        DB::table('accounts')->insert([
            'email' => 'apfel.mus@hof-university.de',
            'password' => 'clearTextPassword',
            'type' => 'Docent',
            'active' => true,
            'last_login' => '2017-07-10 13:00:05'
        ]);
        DB::table('accounts')->insert([
            'email' => 'knop.lauch@hof-university.de',
            'password' => 'clearTextPassword',
            'type' => 'Student',
            'active' => false,
            'last_login' => '2017-01-10 08:47:05'
        ]);
    }
}
