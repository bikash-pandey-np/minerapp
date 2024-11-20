<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@app.com',
            'password' => Hash::make('password'),
            'is_superadmin' => true,
        ]);

        User::create([
            'name' => 'Admin One',
            'email' => 'admin1@app.com',
            'password' => Hash::make('password'),
        ]);
    }
}
