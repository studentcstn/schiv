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
           'account_id' => 5,
           'invalid_at' => '2020-01-01 00:00:00',
           'hash' => 'secret1',
        ]);

        DB::table('user_tokens')->insert([
           'account_id' => 4,
           'invalid_at' => '1970-01-01 00:00:00',
            'hash' => 'secret2',
        ]);
    }
}
