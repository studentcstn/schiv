<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Account;
use App\Faculties;

class SettingsControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testShowSuccess() {
        $account = Account::find(1);
        $response = $this->getJson('1/settings');
        $response->assertStatus(200);
        $response->assertJson([
            'email' => $account->email,
            'account_faculties' => [],
            'faculties' => []
        ]);
    }

    public function testShowFail() {
        $response = $this->getJson('999/settings');
        $response->assertStatus(404);
    }

    private function getValidRequest() {
        return [
            'password' => 'foofoofoofoo',
            'email' => 'foo@foo.foo',
            'faculties' => [['id' => 3]]
        ];
    }

    public function testUpdateSuccess() {
        $response = $this->putJson('1/settings', $this->getValidRequest());
        $response->assertStatus(200);
        $this->assertDatabaseHas('accounts', [
            'id' => 1,
            'password' => 'foofoofoofoo',
            'email' => 'foo@foo.foo'
        ]);
        $this->assertDatabaseHas('account_faculties', [
            'account_id' => 1,
            'faculty_id' => 3
        ]);
    }

    public function testUpdatePasswordFail() {
        $request = $this->getValidRequest();
        $request['password'] = "foo";
        $response = $this->putJson('1/settings', $request);
        $response->assertStatus(500);

        unset($request->password);
        $response = $this->putJson('1/settings', $request);
        $response->assertStatus(500);
    }

    public function testUpdateEmailFail() {
        $request = $this->getValidRequest();
        $request['email'] = "foo@foo.";
        $response = $this->putJson('1/settings', $request);
        $response->assertStatus(500);

        unset($request->email);
        $response = $this->putJson('1/settings', $request);
        $response->assertStatus(500);
    }

    public function testUpdateFacultiesFail() {
        $request = $this->getValidRequest();
        $request['faculties'] = [['foo' => 'bar']];
        $response = $this->putJson('1/settings', $request);
        $response->assertStatus(500);

        unset($request->faculties);
        $response = $this->putJson('1/settings', $request);
        $response->assertStatus(500);
    }

    public function testUpdateFail() {
        $response = $this->putJson('999/settings');
        $response->assertStatus(404);
    }
}
