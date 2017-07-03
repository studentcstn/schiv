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

class AppointmentRequestControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testGetRequestsStudent()
    {
        Auth::login(Account::find(1));
        $response = $this->getJson('appointment_requests');
        $response->assertStatus(200);
        $response->assertJson([[
            'id' => '3',
            'account_id' => '1',
            'description' => 'dies ist auch eine Testanfrage',
            'subject' => 'über das möchte ich nicht reden',
            'state' => 'Idle',
            'appointment_id' => '3'
        ]]);
    }

    public function testGetRequestsDocent()
    {
        Auth::login(Account::find(3));
        $response = $this->getJson('appointment_requests');
        $response->assertStatus(200);
        $response->assertJson([
            ['id' => 2,
            'description' => 'dies ist auch eine Testanfrage',
            'subject' => 'über das möchte ich nicht reden',
            'state' => 'Idle',
            'email' => 'hanz.wurst@hof-university.de',
            'appointment_id' => 2],
            ['id' => 3,
            'description' => 'dies ist auch eine Testanfrage',
            'subject' => 'über das möchte ich nicht reden',
            'state' => 'Idle',
            'email' => 'max.musterman@hof-university.de',
            'appointment_id' => 3]
        ]);
    }

    public function testGetRequestsPastStudent()
    {
        Auth::login(Account::find(1));

        $app_id = DB::table('appointments')
            ->insertGetId([
                'account_id' => 3,
                'description' => 'Test',
                'active' => true,
                'date' => '1945-09-02',
                'time_from' => '20:00:00',
                'time_to' => '21:00:00'
            ]);

        DB::table('appointment_requests')
            ->insert([
                'account_id' => 1,
                'description' => 'Test',
                'subject' => 'Test',
                'active' => true,
                'state' => 'Idle',
                'appointment_id' => $app_id
            ]);

        $response = $this->getJson('appointment_requests/past');
        $response->assertStatus(200);
        $response->assertJson([[
            'account_id' => 1,
            'description' => 'Test',
            'subject' => 'Test',
            'state' => 'Idle',
            'appointment_id' => $app_id
        ]]);
    }

    public function testGetRequestsPastDocent()
    {
        Auth::login(Account::find(3));

        $app_id = DB::table('appointments')
            ->insertGetId([
                'account_id' => 3,
                'description' => 'Test',
                'active' => true,
                'date' => '1945-09-02',
                'time_from' => '20:00:00',
                'time_to' => '21:00:00'
            ]);

        DB::table('appointment_requests')
            ->insert([
                'account_id' => 1,
                'description' => 'Test',
                'subject' => 'Test',
                'active' => true,
                'state' => 'Idle',
                'appointment_id' => $app_id
            ]);

        $response = $this->getJson('appointment_requests/past');
        $response->assertStatus(200);
        $response->assertJson([[
            'account_id' => 1,
            'description' => 'Test',
            'subject' => 'Test',
            'email' => 'max.musterman@hof-university.de',
            'state' => 'Idle',
            'appointment_id' => $app_id
        ]]);
    }

    public function testPostRequestsTest()
    {
        Auth::login(Account::find(1));

        $app_id = DB::table('appointments')
            ->insertGetId([
                'account_id' => 3,
                'description' => 'Test',
                'active' => true,
                'date' => '1945-09-02',
                'time_from' => '20:00:00',
                'time_to' => '21:00:00'
            ]);

        $response = $this->postJson('appointment_requests', ['appointment_id' => $app_id, 'description' => 'Test', 'subject' => 'Test']);
        $response->assertStatus(200);
        $this->assertDatabaseHas('appointment_requests', [
            'account_id' => 1,
            'description' => 'Test',
            'subject' => 'Test',
            'active' => true,
            'state' => 'Idle',
            'appointment_id' => $app_id
        ]);
    }

    public function testPutRequestsTest()
    {
        Auth::login(Account::find(3));

        $response = $this->putJson('appointment_requests', [
            'id' => '3',
            'state' => 'Accepted',
            'duration_in_min' => '15'
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('appointment_requests', [
            'id' => 3,
            'account_id' => 1,
            'description' => 'dies ist auch eine Testanfrage',
            'subject' => 'über das möchte ich nicht reden',
            'duration_in_min' => 15,
            'active' => true,
            'state' => 'Accepted',
            'appointment_id' => 3
        ]);
    }
}
