<?php

use App\Models\User;

it('should make new user model')
    ->expect(fn () => User::factory()->make())
    ->toBeInstanceOf(User::class);

it('should create new user model')
    ->expect(fn () => User::factory()->create())
    ->toBeInstanceOf(User::class);

it('user model should use soft deletes')
    ->expect(
        fn () => User::factory()->trashed()->create()
    )->toBeSoftDeleted();

it('user model should be restored from soft delete')
    ->expect(
        fn () => tap(
            User::factory()->trashed()->create(),
            fn (User $user) => $user->restore()
        )
    )->not()->toBeSoftDeleted();
