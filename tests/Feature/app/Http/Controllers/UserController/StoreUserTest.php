<?php

declare(strict_types=1);

use function Pest\Laravel\assertDatabaseHas;
use function Tests\Helpers\Http\User\store;

it('should create a user successfully', function (array $payload) {
    // Arrange & Act
    $response = store($payload);

    // Assert
    $response->assertCreated();
    assertDatabaseHas('users', ['id' => 1]);
})->with('create user valid payloads');

it('should not create a user with invalid payload', function (array $payload) {
    // Arrange & Act
    $response = store($payload);

    // Assert
    $response->assertBadRequest();
})->with('create user invalid payloads');
