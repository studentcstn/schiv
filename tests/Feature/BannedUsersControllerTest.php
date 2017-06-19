<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class BannedUsersControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testShowSuccess() {
        $response = $this->getJson('3/banned_users');
        $response->assertStatus(200);
        $response->assertJson([['account_banned_id' => 2]]);
    }

    public function testShowFail() {
        $response = $this->getJson('999/banned_users');
        $response->assertStatus(404);
    }

    public function testStoreSuccess() {
        $expectedRow = [
            'account_id' => 3,
            'account_banned_id' => 1
        ];
        $this->assertDatabaseMissing('banned_users', $expectedRow);
        $response = $this->postJson('3/banned_users', ['user_id' => 1]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('banned_users', $expectedRow);
    }

    public function testDestroySuccess() {
        $expectedRow = [
            'account_id' => 3,
            'account_banned_id' => 2
        ];
        $this->assertDatabaseHas('banned_users', $expectedRow);
        $response = $this->deleteJson('3/banned_users/2');
        $response->assertStatus(200);
        $this->assertDatabaseMissing('banned_users', $expectedRow);
    }

    public function testDestroyFail() {
        $expectedRow = [
            'account_id' => 3,
            'account_banned_id' => 2
        ];
        $this->assertDatabaseHas('banned_users', $expectedRow);
        $response = $this->deleteJson('3/banned_users/999');
        $response->assertStatus(404);
        $this->assertDatabaseHas('banned_users', $expectedRow);
    }
}
