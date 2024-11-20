<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Customer;
use Illuminate\Support\Facades\Hash;
class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Customer::create([
            'full_name' => 'John Doe',
            'email' => 'customer1@miner.com',
            'password' => Hash::make('password'),
        ]);

        Customer::create([
            'full_name' => 'Jane Doe',
            'email' => 'customer2@miner.com',
            'password' => Hash::make('password'),
        ]);

        Customer::create([
            'full_name' => 'John Doe',
            'email' => 'customer3@miner.com',
            'password' => Hash::make('password'),
            'is_active' => false,
        ]);
    }
}
