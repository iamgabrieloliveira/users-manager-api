<?php

use App\Models\User;
use function Tests\Helpers\Http\User\update;

it('should update user fields', function () {
    // Arrange
    $user = User::factory()->create();
    $payload = [
        'username' => 'New username',
        'first_name' => 'New first name',
        'last_name' => 'New last name',
        'email' => 'new@email',
        'password' => 'New password',
    ];

    // Act
    $response = update($user->id, $payload);

    // Assert
    $response->assertNoContent();
    $user->refresh();

    expect($user->username)->toBe($payload['username'])
        ->and($user->first_name)->toBe($payload['first_name'])
        ->and($user->last_name)->toBe($payload['last_name'])
        ->and($user->email)->toBe($payload['email'])
        ->and($user->password)->toBe($payload['password']);
});

it('should not update an field when missing on request', function () {
    // Arrange
    $user = User::factory()->create();
    $previousUsername = $user->username;
    $payload = [
        'first_name' => 'New first name',
        'last_name' => 'New last name',
        'email' => 'new@email',
        'password' => 'New password',
    ];

    // Act
    $response = update($user->id, $payload);

    // Assert
    $response->assertNoContent();
    $user->refresh();

    expect($user->username)->toBe($previousUsername)
        ->and($user->first_name)->toBe($payload['first_name'])
        ->and($user->last_name)->toBe($payload['last_name'])
        ->and($user->email)->toBe($payload['email'])
        ->and($user->password)->toBe($payload['password']);
});

it('should return validation error when given required field as empty', function () {
    // Arrange
    $user = User::factory()->create();
    $payload = [
        'username' => '',
        'first_name' => 'New first name',
        'last_name' => 'New last name',
        'email' => 'new@email',
        'password' => 'New password',
    ];

    // Act
    $response = update($user->id, $payload);

    // Assert
    $response->assertBadRequest();
});
