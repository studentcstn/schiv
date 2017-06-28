<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

use App\Account;
use App\AccountBan;
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
        AppointmentRequest::where('active', true)
            ->update([
                'state' => 'Declined',
                'active' => false
            ]);
        DB::commit();
    }
}
