<?php

namespace Database\Seeders;
use App\Models\State;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $states = array('Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi');

        

        $createRecord = function ($state){
           $tate = State::create([
                'name' => $state
            ]);

            return $tate;
        };

        array_map($createRecord, $states);
    }
}
