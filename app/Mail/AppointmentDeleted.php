<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AppointmentDeleted extends Mailable {
    use Queueable, SerializesModels;
    
    private $date;
    private $time;
    
    public function __construct($date, $time) {
        $this->date= $date;
        $this->time = $time;
        $this->subject('Termin gelöscht / Appointment deleted');
    }
    
    public function build() {
        return $this->view('emails.appointmentdeleted', [
            'date'    => $this->date,
            'time' => $this->time,
        ]);
    }
}
