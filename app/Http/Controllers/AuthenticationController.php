<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\AuthenticateUserRequest;
use App\Models\User;
use App\Resources\UserResource;
use Illuminate\Http\JsonResponse;

class AuthenticationController extends Controller
{
    public function authenticate(AuthenticateUserRequest $request): JsonResponse
    {
        $dto = $request->getDTO();

        $token = auth()->attempt([
            'email' => $dto->email,
            'password' => $dto->password,
        ]);

        if (!$token) {
            return $this->unauthorized('Invalid email or password');
        }

        /** @var $user User */
        $user = auth()->user();

        return $this->ok([
            'token' => $token,
            'user' => UserResource::make($user),
        ]);
    }

    public function me(): JsonResponse|UserResource
    {
        $loggedIn = auth()->check();

        if (!$loggedIn) {
            return $this->unauthorized();
        }

        /** @var $user User */
        $user = auth()->user();

        return UserResource::make($user);
    }

    public function logout(): JsonResponse
    {
        auth()->logout();

        return $this->noContent();
    }
}