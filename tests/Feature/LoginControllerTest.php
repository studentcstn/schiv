<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Account;

class LoginControllerTest extends TestCase {
    use DatabaseTransactions;

    public function testLoginSuccess() {
        $account = Account::find(1);
        $this->assertTrue(Auth::user() === null);
        $response = $this->put('login', [
            'email' => $account->email,
            'password' => 'clearTextPassword'
        ]);
        $response->assertStatus(200);
        $response->assertSessionHas('login_account_id', $account->id);
        $this->assertEquals($account->id, Auth::user()->id);
    }

    public function testLoginFail() {
        $response = $this->putJson('login', [
            'email' => "abc",
            'password' => 'clearTextPassword'
        ]);
        $response->assertStatus(422);

        $response = $this->putJson('login', [
            'email' => "abc@abc.abc"
        ]);
        $response->assertStatus(422);

        $response = $this->putJson('login', [
            'email' => "abc@abc.abc",
            'password' => "abc"
        ]);
        $response->assertStatus(401);
    }
}
