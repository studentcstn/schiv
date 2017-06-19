<?php
use Illuminate\Database\Seeder;

class BannedUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('banned_users')->insert([
            'account_id' => 3,
            'account_banned_id' => 2,
            'banned_until' => '2017-09-15 00:00:00'
        ]);
    }
}
