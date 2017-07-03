<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;

use App\Account;
use App\Holiday;

class HolidayControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function setUp() {
        parent::setUp();
        Auth::login(Account::find(3));
    }

    public function testShowSuccess() {
        $response = $this->getJson(
            'holidays/2017-01-01/2017-04-30'
        );
        $response->assertStatus(200);
        $response->assertJson([[
            "name" => "Ostern",
            "from" => "2017-04-13",
            "to" => "2017-04-18"
        ]]);
    }

    public function testShowDateFormatFail() {
        $response = $this->getJson('holidays/2017-01-01/2017-42-42');
        $response->assertStatus(422);
        $response = $this->getJson('holidays/2017-01-01/2017-02-30');
        $response->assertStatus(422);
    }

    public function testStoreSuccess() {
        $request = [
            'from' => '2017-09-09',
            'to' => '2017-09-09',
            'name' => 'Frei'
        ];
        $response = $this->postJson('holidays', $request);
        $response->assertStatus(200);
        $response->assertJsonStructure(["id"]);

        $id = $response->getData()->id;
        $response = $this->postJson('holidays', $request);
        $response->assertStatus(200);
        $response->assertJson(["id" => $id]);

        $this->assertDatabaseHas('holidays',
            array_merge(['id' => $id], $request)
        );
    }

    public function testStoreFail() {
        $wrong = [
            ['from', ''],
            ['to', ''],
            ['from', '2017-02-30'],
            ['to', '2017-02-30'],
            ['from', '2017-02-28'],
            ['name', ''],
            ['name', 'A'],
            ['name', str_repeat('A', 51)],
        ];

        $requestTemplate = [
            'from' => '2017-01-01',
            'to' => '2017-01-01',
            'name' => 'foobar',
        ];

        foreach ($wrong as list($key, $value)) {
            $request = $requestTemplate;
            $request[$key] = $value;
            $response = $this->postJson('holidays', $request);
            $response->assertStatus(422);
        }
    }

    private function createNewHoliday() {
        $holiday = new Holiday;
        $holiday->account_id = Auth::user()->id;
        $holiday->from = '2017-09-09';
        $holiday->to = '2017-09-09';
        $holiday->name = 'Frei';
        $holiday->ignore = false;
        $holiday->save();
        return $holiday;
    }

    public function testUpdateSuccess() {
        $holiday = $this->createNewHoliday();

        $requestTemplate = [
            'from' => '2017-01-01',
            'to' => '2017-01-01',
            'name' => 'foobar',
        ];

        $request = [
            'id' => $holiday->id
        ];

        foreach ($requestTemplate as $key => $value) {
            $request[$key] = $value;
            $response = $this->putJson('holidays', $request);
            $response->assertStatus(200);
            $this->assertDatabaseHas('holidays', $request);
        }
    }

    public function testDestroySuccess() {
        $holiday = $this->createNewHoliday();
        $this->assertDatabaseHas('holidays', [
            'id' => $holiday->id
        ]);
        $response = $this->deleteJson('holidays/' . $holiday->id);
        $response->assertStatus(200);
        $this->assertDatabaseMissing('holidays', [
            'id' => $holiday->id
        ]);
    }
}
