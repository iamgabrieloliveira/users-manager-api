<?php

use App\Models\User;

it('should make new user model')
    ->expect(fn () => User::factory()->make())
    ->toBeInstanceOf(User::class);

it('should create new user model')
    ->expect(fn () => User::factory()->create())
    ->toBeInstanceOf(User::class);
