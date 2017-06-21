<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Account;
use App\UserToken;

class RegisterControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testStoreSuccess() {
        $response = $this->postJson('register', [
            'email' => 'foo@bar.baz',
            'password' => '0123456789'
        ]);
        $response->assertStatus(200);
    }

    public function testStorePasswordFail() {
        $response = $this->postJson('register', [
            'email' => 'foo@bar.baz',
            'password' => '012345678'
        ]);
        $response->assertStatus(500);

        $response = $this->postJson('register', [
            'email' => 'foo@bar.baz'
        ]);
        $response->assertStatus(500);
    }

    public function testStoreEmailFail() {
        $response = $this->postJson('register', [
            'email' => 'foo@bar',
            'password' => '0123456789'
        ]);
        $response->assertStatus(500);

        $response = $this->postJson('register', [
            'password' => '0123456789'
        ]);
        $response->assertStatus(500);
    }

    public function testUpdateSuccess() {
        $token = 'secret1';
        $account = UserToken::where('hash', $token)
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
        $response->assertStatus(500);
    }
}