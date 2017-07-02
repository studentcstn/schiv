<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\QueryException;

use App\Holiday;
use InvalidArgumentException;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\RetrieveDocents::class,
        Commands\RetrieveHolidays::class,
        Commands\Maintance::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule) {
        try {
            $currentDate = date("Y-m-d");
            $beginNextSemester = date(
                "Y-m-d",
                Holiday::getBeginNextSemester()
            );

            if ($currentDate == $beginNextSemester) {
                $schedule
                    ->command('retrieve:holidays')
                    ->daily()
                    ->at('00:00');
                $schedule
                    ->command('retrieve:docents')
                    ->daily()
                    ->at('00:00');
                $schedule
                    ->command('maintance')
                    ->daily()
                    ->at('00:00');
            }
        } catch (QueryException $e) {
            return;
        } catch (InvalidArgumentException $e) {
            return;
        }
    }

    /**
     * Register the Closure based commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        require base_path('routes/console.php');
    }
}
