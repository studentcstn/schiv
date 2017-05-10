<?php

class AccountTableSeed extends Seeder {
    public function run() {
        factory(App\Account::class, 10)->create()->each(function ($u) {
            $u->posts()->save(factory(App\Post::class)->make());
        });
    }
}