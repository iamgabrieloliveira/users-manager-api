<?php

use App\Models\User;

use function Tests\Helpers\Http\User\destroy;

it('should delete user successfully', function () {
    // Arrange
    $user = User::factory()->create();

    // Act
    $response = destroy($user->id);

    // Assert
    $response->assertNoContent();
    expect($user)->toBeSoftDeleted();
});
