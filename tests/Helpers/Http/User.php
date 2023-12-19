<?php

declare(strict_types=1);

namespace Tests\Helpers\Http\User;

use Illuminate\Testing\TestResponse;

use function Pest\Laravel\{delete, get, post, put};

function index(array $payload = []): TestResponse
{
  return get(route('api.user.index', $payload));
}

function store(array $payload = []): TestResponse
{
    return post(route('api.user.store'), $payload);
}

function update(int $userId, array $payload = []): TestResponse
{
    return put(route('api.user.update', ['user' => $userId]), $payload);
}

function destroy(int $userId): TestResponse
{
    return delete(route('api.user.destroy', ['user' => $userId]));
}
