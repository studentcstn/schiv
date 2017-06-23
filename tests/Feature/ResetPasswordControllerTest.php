<?php
namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Account;

class ResetPasswordControllerTest extends TestCase {
    use WithoutMiddleware;
    use DatabaseTransactions;

    public function testResetSuccess() {
        $account = Account::find(1);

        $this->assertEquals($account->active, true);
        $oldPassword = $account->password;

        $response = $this->putJson('reset', [
            'email' => $account->email
        ]);

        $response->assertStatus(200);

        $account = Account::find(1);
        $this->assertTrue($account->active == false);
        $this->assertTrue($account->password !== $oldPassword);
    }

    public function testResetFail() {
        $response = $this->putJson('reset', []);
        $response->assertStatus(422);

        $response = $this->putJson('reset', ['email' => 'foo']);
        $response->assertStatus(422);

        $response = $this->putJson('reset', ['email' => 'foo@foo.foo']);
        $response->assertStatus(404);
    }
}
