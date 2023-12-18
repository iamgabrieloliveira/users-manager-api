<?php

use App\Models\User;

use Illuminate\Testing\TestResponse;
use function Tests\Helpers\Http\User\index;

function getUsersFromResponse(TestResponse $response) {
    $users = $response['users'] ?? null;
    return expect($users)->not()->toBeNull();
}

it('should list all existing users', function () {
    // Arrange
    $TOTAL_RECORDS = 3;
    User::factory()->createMany($TOTAL_RECORDS);

    // Act
    $response = index();

    // Assert
    getUsersFromResponse($response)->toHaveCount($TOTAL_RECORDS);
});

it('should list all users matching FIRST NAME with the given search', function () {
    // Arrange
    $search = 'John';
    $numberOfMatches = 1;
    $allUsersFirstNames = [
        'John Doe',
        'Gilbert Gill',
        'Bill Gates',
    ];

    User::factory()
        ->sequence(
            ...array_map(
                callback: fn (string $name) => ['first_name' => $name],
                array: $allUsersFirstNames
            )
        )->createMany(count($allUsersFirstNames));

    // Act
    $response = index(['q' => $search]);

    // Assert
    getUsersFromResponse($response)->toHaveCount($numberOfMatches);
});

it('should list all users matching LAST NAME with the given search', function () {
    // Arrange
    $search = 'Gates';
    $numberOfMatches = 1;
    $allUsersLastNames = [
        'John Doe',
        'Gilbert Gill',
        'Bill Gates',
    ];

    User::factory()
        ->sequence(
            ...array_map(
                callback: fn (string $name) => ['last_name' => $name],
                array: $allUsersLastNames
            )
        )->createMany(count($allUsersLastNames));

    // Act
    $response = index(['q' => $search]);

    // Assert
    getUsersFromResponse($response)->toHaveCount($numberOfMatches);
});

it('should list all users matching USERNAME with the given search', function () {
    // Arrange
    $search = 'Microsoft';
    $numberOfMatches = 1;
    $allUsersUsernames = [
        'JohnDoe2020',
        'GilbertGill109',
        'Microsofter',
    ];

    User::factory()
        ->sequence(
            ...array_map(
                callback: fn (string $name) => ['user_name' => $name],
                array: $allUsersUsernames
            )
        )->createMany(count($allUsersUsernames));

    // Act
    $response = index(['q' => $search]);

    // Assert
    getUsersFromResponse($response)->toHaveCount($numberOfMatches);
});
