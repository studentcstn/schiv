<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

use App\Account;
use App\AccountBan;
use App\Appointment;
use App\AppointmentRequest;

class Maintance extends Command {
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'maintance';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Maintance at begin/end of a semester';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle() {
        DB::beginTransaction();
        AccountBan::truncate();
        Account::where('type', 'Student')
            ->update(['active' => false]);

        // Delete old records
        $tenYearsAgo = date('Y-m-d H:i:s', strtotime('-10 years'));
        $tenYearsAgo = date('Y-m-d H:i:s');
        Account::where('last_login_at', '<=', $tenYearsAgo)
            ->delete();
        AppointmentRequest::where('updated_at', '<=', $tenYearsAgo)
            ->delete();
        $appointments = Appointment::where('updated_at', '<=', $tenYearsAgo)
            ->get();
        foreach ($appointments as $appointment) {
            $count = AppointmentRequest::where('appointment_id', $appointment->id)
                ->count();
            if (!$count) {
                $appointment->delete();
            }
        }
        DB::commit();
    }
}
