<?php

use Illuminate\Database\Seeder;

class UserTokensTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user_tokens')->insert([
           'account_id' => 4,
           'ttl_in_sec' => 6000,
            'hash' => md5('testhash'),
        ]);
        
        DB::table('user_tokens')->insert([
           'account_id' => 5,
           'ttl_in_sec' => 6000,
           'hash' => md5('hashtest'),
        ]);
    }
}
