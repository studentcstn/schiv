<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);

        Model::unguard();

        $this->call(FacultiesTableSeeder::class);
        $this->call(AccountsTableSeeder::class);
        $this->call(AccountsFacultiesTableSeeder::class);
        $this->call(AppointmentsTableSeeder::class);
        $this->call(AppointmentRequestsTableSeeder::class);
        $this->call(UserTokensTableSeeder::class);
        $this->call(HolidaysTableSeeder::class);
        $this->call(BannedUsersTableSeeder::class);

        Model::reguard();
    }
}
