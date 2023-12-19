<?php

use App\Models\User;

use function Tests\Helpers\Http\User\show;

it('should return user data successfully', function () {
    // Arrange
    $user = User::factory()->create();

    // Act
    $response = show($user->id);

    // Assert
    $response->assertJson([
       'user' => [
           'username' => $user->username,
           'first_name' => $user->first_name,
           'last_name' => $user->last_name,
           'email' => $user->email,
       ]
    ]);
});

it('should return not found when user does not exist', function () {
    // Arrange & Act & Assert
    show(0)->assertNotFound();
});
