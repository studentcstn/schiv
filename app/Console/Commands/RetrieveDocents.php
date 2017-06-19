<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Account;

class RetrieveDocents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'retrieve:docents {username} {password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Retrieve docents from ios interface';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $baseurl = "https://www.hof-university.de/soap/client.php?";
        $username = $this->argument('username');
        $password = $this->argument('password');

        $context = stream_context_create([
            'http' => [
                'header' => "Authorization: Basic ".base64_encode("$username:$password")
            ]
        ]);

        $response = file_get_contents($baseurl."f=Courses&tt=SS", false, $context);
        $courses = json_decode($response)->courses;

        $types = ["SS", "WS"];
        foreach ($courses as $course) {
            $name = $course->course;
            $semester = $course->semester;
            foreach ($semester as $s) {
                foreach ($types as $type) {
                    $url = sprintf(
                        $baseurl."f=Schedule&stg=%s&sem=%s&tt=%s",
                        urlencode($name),
                        urlencode($s),
                        urlencode($type)
                    );
                    $response = file_get_contents($url, false, $context);
                    $lectures = json_decode($response);
                    foreach ($lectures->schedule as $lecture) {
                        $docentString = $lecture->docent;
                        if (!$docentString) {
                            continue;
                        }
                        $pieces = preg_split("#§§|/#", $docentString);
                        foreach ($pieces as $piece) {
                            $piece = trim($piece);
                            $docents[$piece] = $piece;
                        }
                    }
                }
            }
        }

        foreach ($docents as $docent) {
            $docent = str_replace("Professoren", "", $docent);
            $docent = str_replace("Prüfungsaufsicht", "", $docent);
            $docent = str_replace("Fakultät", "", $docent);
            $docent = str_replace("ING", "", $docent);
            $docent = str_replace("MBA", "", $docent);
            $docent = str_replace("ä", "ae", $docent);
            $docent = str_replace("ö", "oe", $docent);
            $docent = str_replace("ü", "ue", $docent);
            $docent = preg_replace("#\(.*\)#", "", $docent);
            $docent = trim($docent);

            $names = explode(" ", $docent);
            $length = count($names);
            if ($length < 2) {
                continue;
            }

            $name = $names[$length - 2]." ".$names[$length - 1];

            if (preg_match("/(Frau)|(Herr)|[,.-]/", $name) === 1) {
                continue;
            }

            $partOne = strtolower($names[$length - 2]);
            $partTwo = strtolower($names[$length - 1]);

            $account = new Account;
            $account->email = "$partOne.$partTwo@hof-university.de";
            $account->password = "";
            $account->type = 'Docent';
            $account->active = false;
            $account->last_login = "0000-00-00 00:00:00";
            $account->save();

            echo $account->email."\n";
        }
    }
}
