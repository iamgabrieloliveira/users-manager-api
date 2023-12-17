<?php

declare(strict_types=1);

namespace Tests\Helpers\Http;

use Illuminate\Testing\TestResponse;
use function Pest\Laravel\delete;
use function Pest\Laravel\post;

function storeUser(array $payload = []): TestResponse
{
    return post(route('api.user.store', $payload));
}

function destroyUser(int $userId): TestResponse
{
    return delete(route('api.user.destroy', ['user' => $userId]));
}
