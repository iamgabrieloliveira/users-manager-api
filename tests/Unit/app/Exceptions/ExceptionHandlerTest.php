<?php

use App\Exceptions\UnableToDeleteModelException;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

it('should render UnableToDeleteModelException correctly for models', function (Model $model) {
    // Arrange
    $exception = new UnableToDeleteModelException($model);

    // Act & Assert
    renderException($exception)
        ->asAssertable()
        ->assertBadRequest();
})->with([
    'User' => fn () => User::factory()->make(),
]);
