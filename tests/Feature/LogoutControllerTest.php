<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Account;

class LogoutControllerTest extends TestCase {
    use DatabaseTransactions;

    public function testLogoutSuccess() {
        $account = Account::find(1);
        $this->assertTrue(Auth::user() === null);
        $response = $this->put('login', [
            'email' => $account->email,
            'password' => 'clearTextPassword'
        ]);
        $response->assertStatus(200);
        $response->assertSessionHas('login_account_id', $account->id);
        $this->assertEquals($account->id, Auth::user()->id);

        $response = $this->put('logout', []);
        $response->assertStatus(200);
        $response->assertSessionMissing('login_account_id', $account->id);
        $this->assertTrue(Auth::user() === null);
    }
}
