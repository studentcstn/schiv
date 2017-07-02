<?php
use Illuminate\Database\Seeder;

class AccountBansTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('account_bans')->insert([
            'account_id' => 1,
            'account_ban_id' => 3,
            'ban_until' => '2017-09-15 00:00:00'
        ]);
    }
}
