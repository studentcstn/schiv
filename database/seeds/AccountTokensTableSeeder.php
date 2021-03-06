<?php

use Illuminate\Database\Seeder;

class AccountTokensTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        DB::table('account_tokens')->insert([
           'account_id' => 5,
           'invalid_at' => '2020-01-01 00:00:00',
           'token' => 'secret1',
        ]);
        DB::table('account_tokens')->insert([
           'account_id' => 4,
           'invalid_at' => '1970-01-01 00:00:00',
            'token' => 'secret2',
        ]);
    }
}
