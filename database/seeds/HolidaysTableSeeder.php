<?php

use Illuminate\Database\Seeder;

class HolidaysTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $holidays = [
            [ "Ostern"                    , "13.04.2017" , "18.04.2017" ] ,
            [ "Maifeiertag"               , "01.05.2017" , ""           ] ,
            [ "Christi Himmelfahrt"       , "25.05.2017" , ""           ] ,
            [ "Pfingsten"                 , "02.06.2017" , "07.06.2017" ] ,
            [ "Fronleichnam"              , "15.06.2017" , ""           ] ,
            [ "Semesterferien"            , "30.07.2017" , "30.09.2017" ] ,
            [ "Tag der Deutschen Einheit" , "03.10.2017" , ""           ] ,
            [ "Beweglicher freier Tag"    , "30.10.2017" , ""           ] ,
            [ "Reformationstag"           , "31.10.2017" , ""           ] ,
            [ "Allerheiligen"             , "01.11.2017" , ""           ] ,
            [ "Weihnachten"               , "23.12.2017" , "07.01.2018" ] ,
            [ "Semesterferien"            , "16.02.2018" , "14.03.2018" ] ,
        ];

        foreach ($holidays as list($name, $from, $to)) {
            if ($to == "") {
                $to = $from;
            }
            DB::table('holidays')->insert([
                'from' => date('Y-m-d H:i:s', strtotime($from)),
                'to'   => date('Y-m-d H:i:s', strtotime($to)),
                'name' => $name,
            ]);
        }
    }
}
