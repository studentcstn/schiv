<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class Reactivate extends Mailable {
    use Queueable, SerializesModels;

    private $token;
    private $password;

    public function __construct($token, $password) {
        $this->token = $token;
        $this->password = $password;
    }

    public function build() {
        return $this->view('emails.reactivate', [
            'url'      => env('APP_URL'),
            'token'    => $this->token,
            'password' => $this->password,
        ]);
    }
}
