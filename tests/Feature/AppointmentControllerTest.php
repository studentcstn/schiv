<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

use App\Account;
use App\Faculties;

class AppointmentControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testGetAppointments()
    {
        Auth::login(Account::find(3));

        DB::table('appointments')
            ->where('account_id', '=', 3)
            ->delete();

        DB::table('appointments')
            ->insert([
                'account_id' => 3,
                'description' => 'Test',
                'active' => true,
                'date' => date('Y-m-d'),
                'time_from' => '20:00:00',
                'time_to' => '21:00:00',
            ]);

        $response = $this->getJson('appointments');
        $response->assertStatus(200);
        $response->assertJson([[
            'account_id' => 3,
            'description' => 'Test',
            'active' => true,
            'date' => date('Y-m-d'),
            'time_from' => '20:00:00',
            'time_to' => '21:00:00'
        ]]);
    }

    public function testGetAppointmentsPast()
    {
        Auth::login(Account::find(3));

        DB::table('appointments')
            ->insert([
                'account_id' => 3,
                'description' => 'Test',
                'active' => true,
                'date' => '1945-09-02',
                'time_from' => '20:00:00',
                'time_to' => '21:00:00',
            ]);

        $response = $this->getJson('appointments/past');
        $response->assertStatus(200);
        $response->assertJson([[
            'account_id' => 3,
            'description' => 'Test',
            'active' => true,
            'date' => '1945-09-02',
            'time_from' => '20:00:00',
            'time_to' => '21:00:00'
        ]]);
    }

    public function testPostSingelAppointments()
    {
        Auth::login(Account::find(3));
        $response = $this->postJson('appointments', [
            'weekday' => 'NULL',
            'date' => date('Y-m-d'),
            'description' => 'Test',
            'time_from' => '20:00:00',
            'time_to' => '21:00:00'
        ]);
        $response->assertStatus(200) ;
        $this->assertDatabaseHas('appointments', [
            'account_id' => 3,
            'description' => 'Test',
            'active' => true,
            'date' => date('Y-m-d'),
            'time_from' => '20:00:00',
            'time_to' => '21:00:00'
        ]);
    }

    public function testDeleteAppointments()
    {
        Auth::login(Account::find(3));
        $response = $this->deleteJson('appointments/3');
        $response->assertStatus(200);
        $this->assertDatabaseHas('appointments', [
            'id' => 3,
            'account_id' => 3,
            'description' => 'Klausureinsicht',
            'active' => false,
            'date' => '2017-08-17',
            'time_from' => '11:00:00',
            'time_to' => '12:00:00'
        ]);
    }
}
