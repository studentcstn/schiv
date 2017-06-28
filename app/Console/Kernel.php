<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Config;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        Commands\RetrieveDocents::class,
        Commands\Maintance::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule) {
        if (Config::get('app.debug')) {
            # $dateOfYear = "03-15";

            # $schedule
            #     ->command('retrieve:docents --from-cache')
            #     ->everyMinute()
            #     ->when(function () use ($dateOfYear) {
            #         return (
            #             $dateOfYear == "03-15" ||
            #             $dateOfYear == "09-31"
            #         );
            #     });
        } else {
            $dateOfYear = date("m-d");

            $schedule
                ->command('retrieve:docents')
                ->daily()
                ->at('12:00')
                ->when(function () use ($dateOfYear) {
                    return (
                        $dateOfYear == "03-15" ||
                        $dateOfYear == "09-31"
                    );
                });
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
