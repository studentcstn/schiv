<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Account;
use App\Appointment;

class DocentControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testIndexSuccess() {
        $response = $this->getJson('docents');
        $response->assertStatus(200);
        $this->assertGreaterThan(0, count($response->json()));
    }

    public function testIndexFail() {
        Account::where('type', 'Docent')->delete();
        $response = $this->getJson('docents');
        $response->assertStatus(200);
        $this->assertEquals(count($response->json()), 0);
    }

    public function testShowSucces() {
        $response = $this->getJson('docents/3');
        $response->assertStatus(200);
        $response->assertJson([
            'id' => 3,
            'appointments'=> [[
                'account_id' => 3
            ]]
        ]);
    }

    public function testShowFail() {
        $response = $this->getJson('docents/1');
        $response->assertStatus(404);
    }

    public function testShowNoDocentFail() {
        $response = $this->getJson('docents/999');
        $response->assertStatus(404);
    }
}
