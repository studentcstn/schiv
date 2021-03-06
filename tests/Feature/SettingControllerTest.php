<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Account;
use App\Faculties;

class SettingControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testShowSuccess() {
        Auth::login(Account::find(1));
        $response = $this->getJson('settings');
        $response->assertStatus(200);
        $response->assertJson([
            'email' => Auth::user()->email,
            'account_faculties' => [],
            'faculties' => []
        ]);
    }

    private function getValidRequest() {
        return [
            'password' => 'foofoofoofoo',
            'email' => 'foo@foo.foo',
            'faculties' => [3]
        ];
    }

    public function testUpdateSuccess() {
        Auth::login(Account::find(1));
        $oldPassword = Auth::user()->password;
        $response = $this->putJson('settings', $this->getValidRequest());
        $response->assertStatus(200);
        $this->assertDatabaseHas('accounts', [
            'id' => 1,
            'email' => 'foo@foo.foo'
        ]);
        $this->assertDatabaseMissing('accounts', [
            'id' => 1,
            'password' => $oldPassword
        ]);
        $this->assertDatabaseHas('account_faculties', [
            'account_id' => 1,
            'faculty_id' => 3
        ]);
    }

    public function testUpdateSingleSuccess() {
        Auth::login(Account::find(1));

        $combinations = [
            ['email'],
            ['password'],
            ['faculties'],
            ['email', 'password'],
            ['email', 'faculties'],
            ['password', 'faculties']
        ];

        foreach ($combinations as $combination) {
            $request = [];
            $requestTemplate = $this->getValidRequest();
            foreach ($combination as $key) {
                $request[$key] = $requestTemplate[$key];
            }
            $response = $this->putJson('settings', $request);
            $response->assertStatus(200);
        }
    }

    public function testUpdatePasswordFail() {
        Auth::login(Account::find(1));
        $request = $this->getValidRequest();
        $request['password'] = "foo";
        $response = $this->putJson('settings', $request);
        $response->assertStatus(422);

        unset($request->password);
        $response = $this->putJson('settings', $request);
        $response->assertStatus(422);
    }

    public function testUpdateEmailFail() {
        Auth::login(Account::find(1));
        $request = $this->getValidRequest();
        $request['email'] = "foo@foo.";
        $response = $this->putJson('settings', $request);
        $response->assertStatus(422);

        unset($request->email);
        $response = $this->putJson('settings', $request);
        $response->assertStatus(422);
    }

    public function testUpdateEmailExistsFail() {
        Auth::login(Account::find(1));
        $account = Account::find(2);

        $request = $this->getValidRequest();
        $request['email'] = $account->email;

        $response = $this->putJson('settings', $request);
        $response->assertStatus(401);
    }

    public function testUpdateFacultiesFail() {
        Auth::login(Account::find(1));
        $request = $this->getValidRequest();
        $request['faculties'] = [['foo' => 'bar']];
        $response = $this->putJson('settings', $request);
        $response->assertStatus(500);

        $request['faculties'] = [['id' => 'bar']];
        $response = $this->putJson('settings', $request);
        $response->assertStatus(500);
    }
}
