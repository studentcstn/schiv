<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Account;
use App\AccountToken;

class RegisterControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    private function getValidRequest() {
        return [
            'email' => 'foo@hof-university.de',
            'password' => 'foobarbaz123'
        ];
    }

    public function testStoreSuccess() {
        $request = $this->getValidRequest();
        $response = $this->postJson('register', $request);
        $response->assertStatus(200);
        $this->assertDatabaseMissing('accounts', $request);
        unset($request['password']);
        $this->assertDatabaseHas('accounts', $request);
    }

    public function testStoreAccountExistsSuccess() {
        $request = $this->getValidRequest();

        $account = new Account;
        $account->email = $request['email'];
        $account->password = $oldPassword = $request['password'];
        $account->active = 0;
        $account->type = "Docent";
        $account->save();

        $response = $this->postJson('register', $request);
        $response->assertStatus(200);
        $this->assertDatabaseMissing('accounts', $request);
    }


    public function testStoreForeignEmailFail() {
        $request = $this->getValidRequest();
        $request['email'] = 'foo@foo.foo';
        $response = $this->postJson('register', $request);
        $response->assertStatus(401);
    }

    public function testStoreActiveAndRegisteredFail() {
        $request = $this->getValidRequest();

        $account = new Account;
        $account->email = $request['email'];
        $account->password = $request['password'];
        $account->active = 1;
        $account->type = "Docent";
        $account->save();

        $response = $this->postJson('register', $request);
        $response->assertStatus(409);
    }

    public function testStorePasswordFail() {
        $request = $this->getValidRequest();

        $request['password'] = '012345678';
        $response = $this->postJson('register', $request);
        $response->assertStatus(422);

        unset($request['password']);
        $response = $this->postJson('register', $request);
        $response->assertStatus(422);
    }

    public function testStoreEmailFail() {
        $request = $this->getValidRequest();

        $request['email'] = "foo@foo";
        $response = $this->postJson('register', $request);
        $response->assertStatus(422);

        unset($request['email']);
        $response = $this->postJson('register', $request);
        $response->assertStatus(422);
    }

    public function testUpdateSuccess() {
        $token = 'secret1';
        $account = AccountToken::where('token', $token)
            ->first()
            ->account()
            ->first();
        unset($account->updated_at);
        $this->assertDatabaseHas('accounts', $account->toArray());
        $account->active = 1;
        $this->assertDatabaseMissing('accounts', $account->toArray());
        $response = $this->putJson('register', [
            'token' => $token
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('accounts', $account->toArray());
    }

    public function testUpdateInvalidAtFail() {
        $response = $this->putJson('register', [
            'token' => 'secret2'
        ]);
        $response->assertStatus(404);
    }
}
