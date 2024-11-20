<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MinerPlan;
class MinerPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MinerPlan::create([
            'name' => 'Solona Mining Rig',
            'description' => 'This is a basic plan for mining Solana.',
            'price' => 100,
            'duration' => 30,
            'hash_power' => 1,
            'output_per_minute' => 0.123,
            'output_per_hour' => 7.38,
            'output_per_day' => 177.12,
        ]);

        MinerPlan::create([
            'name' => 'Ethereum Mining Rig',
            'description' => 'This is a pro plan for mining Ethereum.',
            'price' => 200,
            'duration' => 30,
            'hash_power' => 2,
            'output_per_minute' => 0.123*2,
            'output_per_hour' => 7.38*2,
            'output_per_day' => 177.12*2,
        ]);
        
        MinerPlan::create([
            'name' => 'Monero Mining Rig',
            'description' => 'This is an advanced plan for mining Monero.',
            'price' => 499,
            'duration' => 30,
            'hash_power' => 5.2,
            'output_per_minute' => 0.123*5.2,
            'output_per_hour' => 7.38*5.2,
            'output_per_day' => 177.12*5.2,
        ]);
        

    }
}
