<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
         User::factory(100)->create();

         User::factory()->state([
             'username' => 'oliveiratheone',
             'first_name' => 'Gabriel',
             'last_name' => 'Oliveira',
             'email' => 'oliveiragabriel.dev@gmail.com',
             'password' => 'password',
         ])->create();
    }
}
