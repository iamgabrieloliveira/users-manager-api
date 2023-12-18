<?php

declare(strict_types=1);

namespace Tests\Helpers\Http\User;

use Illuminate\Testing\TestResponse;

use function Pest\Laravel\{delete, get, post};

function index(array $payload = []): TestResponse
{
  return get(route('api.user.index', $payload));
}

function store(array $payload = []): TestResponse
{
    return post(route('api.user.store'), $payload);
}

function destroy(int $userId): TestResponse
{
    return delete(route('api.user.destroy', ['user' => $userId]));
}
