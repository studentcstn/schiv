<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

use Symfony\Component\DomCrawler\Crawler;

use App\Account;
use App\Holiday;

class RetrieveHolidays extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'retrieve:holidays';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Retrieve holidays from university homepage';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $content = file_get_contents(
            "http://www.hof-university.de/studierende/studienbuero/termine.html"
        );
        $crawler = new Crawler($content);
        DB::beginTransaction();
        foreach ($crawler->filter('table.contenttable') as $table) {
            $ignoreFlag = true;
            foreach ($table->getElementsByTagName('tr') as $row) {
                $columns = [];
                foreach ($row->getElementsByTagName('td') as $key => $col) {
                    $columns[$key] = trim($col->textContent);
                }
                if (count($columns) != 2) {
                    continue;
                }
                if (isset($columns[1]) && $columns[1] == "") {
                    if ($columns[0] == 'Vorlesungsfreie Zeiten') {
                        $ignoreFlag = false;
                    } else {
                        $ignoreFlag = true;
                    }
                    continue;
                }
                $name = $columns[0];
                $items = explode("-", $columns[1]);

                if (count($items) == 2) {
                    list($from, $to) = $items;
                } else {
                    list($from) = $items;
                    $to = $from;
                }

                $name = trim($name);
                $from = trim($from);
                $to = trim($to);

                $ignoreFlagText = $ignoreFlag ? 'true' : 'false';
                echo sprintf("%5s %-40s %s - %s\n", $ignoreFlagText, utf8_decode($name), $from, $to);

                $holiday = Holiday::firstOrNew([
                    'name' => $name,
                    'from' => date('Y-m-d', strtotime($from)),
                    'to'   => date('Y-m-d', strtotime($to)),
                ]);

                $holiday->ignore = $ignoreFlag;
                $holiday->save();
            }
        }

        DB::commit();
    }
}
