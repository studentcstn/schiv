<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;

use App\Account;

class BannedUsersControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testShowSuccess() {
        Auth::login(Account::find(3));
        $response = $this->getJson('banned_users');
        $response->assertStatus(200);
        $response->assertJson([
            ['account_banned_id' => 2]
        ]);
    }

    public function testStoreSuccess() {
        Auth::login(Account::find(3));
        $expectedRow = [
            'account_id' => 3,
            'account_banned_id' => 5
        ];
        $this->assertDatabaseMissing('banned_users', $expectedRow);
        $response = $this->postJson('banned_users', ['account_banned_id' => 5]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('banned_users', $expectedRow);
    }

    public function testStoreInvalidJsonFail() {
        Auth::login(Account::find(3));
        $expectedRow = [
            'account_id' => 3,
            'account_banned_id' => 1
        ];
        $response = $this->postJson('banned_users', ['foo' => 1]);
        $response->assertStatus(422);
        $response = $this->postJson('banned_users');
        $response->assertStatus(422);
    }

    public function testDestroySuccess() {
        Auth::login(Account::find(3));
        $expectedRow = [
            'account_id' => 3,
            'account_banned_id' => 2
        ];
        $this->assertDatabaseHas('banned_users', $expectedRow);
        $response = $this->deleteJson('banned_users/2');
        $response->assertStatus(200);
        $this->assertDatabaseMissing('banned_users', $expectedRow);
    }

    public function testDestroyFail() {
        Auth::login(Account::find(3));
        $expectedRow = [
            'account_id' => 3,
            'account_banned_id' => 2
        ];
        $this->assertDatabaseHas('banned_users', $expectedRow);
        $response = $this->deleteJson('banned_users/999');
        $response->assertStatus(404);
        $this->assertDatabaseHas('banned_users', $expectedRow);
    }
}
