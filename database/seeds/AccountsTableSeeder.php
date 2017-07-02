<?php
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('accounts')->insert([
            'email' => 'alice.wonderland@hof-university.de',
            'password' => Hash::make('clearTextPassword'),
            'type' => 'Docent',
            'active' => true,
            'last_login_at' => '2017-05-09 12:35:59',
            'created_at' => '2017-05-09 12:35:59',
            'updated_at' => '2017-05-09 12:35:59',
        ]);
        DB::table('accounts')->insert([
            'email' => 'bob.baumeister@hof-university.de',
            'password' => Hash::make('clearTextPassword'),
            'type' => 'Docent',
            'active' => false,
            'last_login_at' => '2017-03-15 03:59:02',
            'created_at' => '2017-05-09 12:35:59',
            'updated_at' => '2017-05-09 12:35:59',
        ]);
        DB::table('accounts')->insert([
            'email' => 'charlie.doll@hof-university.de',
            'password' => Hash::make('clearTextPassword'),
            'type' => 'Student',
            'active' => true,
            'last_login_at' => '2017-05-10 13:47:05',
            'created_at' => '2017-05-09 12:35:59',
            'updated_at' => '2017-05-09 12:35:59',
        ]);
        DB::table('accounts')->insert([
            'email' => 'dave.dave@hof-university.de',
            'password' => Hash::make('clearTextPassword'),
            'type' => 'Student',
            'active' => false,
            'last_login_at' => '2017-07-10 13:00:05',
            'created_at' => '2017-05-09 12:35:59',
            'updated_at' => '2017-05-09 12:35:59',
        ]);
    }
}
