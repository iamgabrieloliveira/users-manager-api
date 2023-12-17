<?php

use App\Exceptions\UnableToDeleteModelException;
use App\Models\User;
use App\Services\UserService;

it('should throw exception when user is unavailable to delete', function () {
    $user = User::factory()->make(); // User is not persisted

    app(UserService::class)->destroy($user);
})->throws(UnableToDeleteModelException::class);

