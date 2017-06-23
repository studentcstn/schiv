<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;

use App\Account;

class AccountBanControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testShowSuccess() {
        Auth::login(Account::find(3));
        $response = $this->getJson('account_bans');
        $response->assertStatus(200);
        $response->assertJson([
            ['account_ban_id' => 2]
        ]);
    }

    public function testStoreSuccess() {
        Auth::login(Account::find(3));
        $expectedRow = [
            'account_id' => 3,
            'account_ban_id' => 5
        ];
        $this->assertDatabaseMissing('account_bans', $expectedRow);
        $response = $this->postJson('account_bans', ['account_ban_id' => 5]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('account_bans', $expectedRow);
    }

    public function testStoreInvalidJsonFail() {
        Auth::login(Account::find(3));
        $expectedRow = [
            'account_id' => 3,
            'account_ban_id' => 1
        ];
        $response = $this->postJson('account_bans', ['foo' => 1]);
        $response->assertStatus(422);
        $response = $this->postJson('account_bans');
        $response->assertStatus(422);
    }

    public function testDestroySuccess() {
        Auth::login(Account::find(3));
        $expectedRow = [
            'account_id' => 3,
            'account_ban_id' => 2
        ];
        $this->assertDatabaseHas('account_bans', $expectedRow);
        $response = $this->deleteJson('account_bans/2');
        $response->assertStatus(200);
        $this->assertDatabaseMissing('account_bans', $expectedRow);
    }

    public function testDestroyFail() {
        Auth::login(Account::find(3));
        $expectedRow = [
            'account_id' => 3,
            'account_ban_id' => 2
        ];
        $this->assertDatabaseHas('account_bans', $expectedRow);
        $response = $this->deleteJson('account_bans/999');
        $response->assertStatus(404);
        $this->assertDatabaseHas('account_bans', $expectedRow);
    }
}
