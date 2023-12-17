<?php

use App\Models\User;
use function Tests\Helpers\Http\{
    destroyUser,
};

it('should delete user successfully', function () {
    // Arrange
    $user = User::factory()->create();

    // Act
    $response = destroyUser($user->id);

    // Assert
    $response->assertNoContent();
    expect($user)->toBeSoftDeleted();
});
